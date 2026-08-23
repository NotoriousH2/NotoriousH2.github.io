import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from 'd3-force';

import { type CategoryId, type TagId, TAGS } from '../data/taxonomy';
import { type Post, tagUsage } from './posts';

export interface GraphNode extends SimulationNodeDatum {
  id: TagId;
  label: string;
  category: CategoryId;
  /** 해당 태그의 글 수. 노드 반지름을 결정한다. */
  count: number;
  r: number;
}

interface SimLink extends SimulationLinkDatum<GraphNode> {
  source: GraphNode | TagId;
  target: GraphNode | TagId;
  /** 같은 글에 함께 등장한 횟수. */
  weight: number;
}

export interface GraphEdge {
  source: TagId;
  target: TagId;
  weight: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Graph {
  nodes: GraphNode[];
  links: GraphEdge[];
  width: number;
  height: number;
  maxWeight: number;
  /** 모든 태그의 글 수가 같으면 노드 안의 숫자는 정보가 아니라 노이즈다. */
  maxCount: number;
}

const WIDTH = 660;
const HEIGHT = 470;

/**
 * d3-force는 내부적으로 Math.random()으로 노드를 흔든다. 그대로 두면 빌드할 때마다
 * 배치가 달라져 diff가 지저분해지므로, 레이아웃 계산 동안만 시드 고정 난수로 바꾼다.
 */
function withSeededRandom<T>(seed: number, fn: () => T): T {
  const original = Math.random;
  let state = seed >>> 0;
  Math.random = () => {
    // mulberry32
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t = t + Math.imul(t ^ (t >>> 7), t | 61);
    t = t ^ (t >>> 14);
    return (t >>> 0) / 4294967296;
  };
  try {
    return fn();
  } finally {
    Math.random = original;
  }
}

/**
 * 태그 공출현 그래프를 빌드 시점에 완전히 수렴시킨다.
 * 브라우저에서 물리 시뮬레이션이 돌지 않으므로 계속 떠다니는 화면이 생기지 않고,
 * JS가 꺼져 있어도 SVG가 그대로 보인다.
 */
export function buildGraph(posts: Post[]): Graph {
  const usage = tagUsage(posts);

  const nodes: GraphNode[] = [...usage.entries()]
    .map(([id, tagged]) => ({
      id,
      label: TAGS[id].label,
      category: TAGS[id].category,
      count: tagged.length,
      r: 0,
    }))
    .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id));

  if (nodes.length === 0) {
    return { nodes: [], links: [], width: WIDTH, height: HEIGHT, maxWeight: 0, maxCount: 0 };
  }

  const maxCount = Math.max(...nodes.map((n) => n.count));
  for (const node of nodes) {
    // 면적이 글 수에 비례하도록 sqrt 스케일. 글이 한 편뿐일 때도 최소 크기를 보장한다.
    node.r = 11 + 20 * Math.sqrt(node.count / maxCount);
  }

  const weights = new Map<string, number>();
  for (const post of posts) {
    const tags = ([...post.data.tags] as TagId[]).sort();
    for (let i = 0; i < tags.length; i++) {
      for (let j = i + 1; j < tags.length; j++) {
        const key = `${tags[i]} ${tags[j]}`;
        weights.set(key, (weights.get(key) ?? 0) + 1);
      }
    }
  }

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const simLinks: SimLink[] = [...weights.entries()].map(([key, weight]) => {
    const [source, target] = key.split(' ') as [TagId, TagId];
    return { source: byId.get(source)!, target: byId.get(target)!, weight };
  });

  withSeededRandom(20240111, () => {
    const simulation = forceSimulation(nodes)
      .force(
        'link',
        forceLink<GraphNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((d) => 170 - Math.min(60, d.weight * 18))
          .strength((d) => Math.min(0.9, 0.18 * d.weight)),
      )
      .force('charge', forceManyBody().strength(-620))
      .force(
        'collide',
        forceCollide<GraphNode>()
          .radius((d) => d.r + 16)
          .strength(1),
      )
      .force('center', forceCenter(WIDTH / 2, HEIGHT / 2))
      .force('x', forceX(WIDTH / 2).strength(0.045))
      .force('y', forceY(HEIGHT / 2).strength(0.075))
      .stop();

    // 배치가 잡힐 때까지 한 번에 돌리고 멈춘다.
    for (let i = 0; i < 500; i++) simulation.tick();
  });

  // 라벨까지 화면 안에 들어오도록 여백을 확보한 뒤 정규화한다.
  const pad = 46;
  const xs = nodes.map((n) => n.x ?? 0);
  const ys = nodes.map((n) => n.y ?? 0);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = Math.max(1, maxX - minX);
  const spanY = Math.max(1, maxY - minY);
  const scale = Math.min((WIDTH - pad * 2) / spanX, (HEIGHT - pad * 2) / spanY, 1.4);

  for (const node of nodes) {
    node.x = pad + ((node.x ?? 0) - minX) * scale + (WIDTH - pad * 2 - spanX * scale) / 2;
    node.y = pad + ((node.y ?? 0) - minY) * scale + (HEIGHT - pad * 2 - spanY * scale) / 2;
  }

  const links: GraphEdge[] = simLinks.map((link) => {
    const source = link.source as GraphNode;
    const target = link.target as GraphNode;
    return {
      source: source.id,
      target: target.id,
      weight: link.weight,
      x1: round(source.x),
      y1: round(source.y),
      x2: round(target.x),
      y2: round(target.y),
    };
  });

  for (const node of nodes) {
    node.x = round(node.x);
    node.y = round(node.y);
    node.r = round(node.r);
  }

  return {
    nodes,
    links,
    width: WIDTH,
    height: HEIGHT,
    maxWeight: links.reduce((max, l) => Math.max(max, l.weight), 0),
    maxCount,
  };
}

function round(value: number | undefined): number {
  return Math.round((value ?? 0) * 100) / 100;
}
