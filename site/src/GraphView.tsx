import { useMemo } from "react";
import { Background, Controls, MiniMap, ReactFlow, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { GraphEdge, PublicObject } from "./types";

const typeColors: Record<string, string> = {
  company: "#846c55",
  investor: "#5f8079",
  investment: "#a98e72",
  person: "#6f7786",
  concept: "#8a758e",
  note: "#8d8473",
  "source.item": "#6e8b88",
  touchpoint: "#8b8175",
  "traffic.snapshot": "#668a7f"
};

function layout(center: string, objects: PublicObject[], edges: GraphEdge[]) {
  const level = new Map([[center, 0]]);
  let frontier = [center];
  for (let depth = 1; depth <= 2; depth += 1) {
    const next: string[] = [];
    for (const edge of edges) {
      if (frontier.includes(edge.from_object_id) && !level.has(edge.to_object_id)) {
        level.set(edge.to_object_id, depth);
        next.push(edge.to_object_id);
      }
      if (frontier.includes(edge.to_object_id) && !level.has(edge.from_object_id)) {
        level.set(edge.from_object_id, depth);
        next.push(edge.from_object_id);
      }
    }
    frontier = next;
  }

  return objects.map((object, index) => {
    const ring = level.get(object.id) ?? 2;
    const peers = objects.filter((item) => (level.get(item.id) ?? 2) === ring);
    const peerIndex = peers.findIndex((item) => item.id === object.id);
    const angle = peers.length > 0 ? (peerIndex / peers.length) * Math.PI * 2 - Math.PI / 2 : 0;
    const radius = ring * 360;
    return {
      id: object.id,
      position: ring === 0 ? { x: 0, y: 0 } : { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
      data: { label: object.title || object.id },
      style: {
        width: ring === 0 ? 210 : 180,
        border: `1px solid ${typeColors[object.type_id] || "#8b8175"}`,
        borderRadius: 4,
        background: ring === 0 ? "#282724" : "#fffefb",
        color: ring === 0 ? "white" : "#302f2c",
        fontSize: 12,
        padding: "9px 12px",
        boxShadow: ring === 0 ? "0 8px 24px rgba(38, 37, 34, .16)" : "0 2px 8px rgba(38, 37, 34, .07)"
      }
    } satisfies Node;
  });
}

export function GraphView({ center, objects, edges, openObject }: { center: string; objects: PublicObject[]; edges: GraphEdge[]; openObject: (id: string) => void }) {
  const nodes = useMemo(() => layout(center, objects, edges), [center, objects, edges]);
  const flowEdges = useMemo(() => edges.map((edge) => ({
    id: String(edge.id),
    source: edge.from_object_id,
    target: edge.to_object_id,
    label: edge.relation,
    type: "smoothstep",
    style: { stroke: "#b9b4aa", strokeWidth: 1 },
    labelStyle: { fill: "#7b766e", fontSize: 9 },
    labelBgStyle: { fill: "#f7f6f1", fillOpacity: 0.9 }
  } satisfies Edge)), [edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={flowEdges}
      fitView
      fitViewOptions={{ padding: 0.22 }}
      minZoom={0.15}
      maxZoom={2}
      onNodeDoubleClick={(_event, node) => openObject(node.id)}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#d9d6cf" gap={24} size={1} />
      <MiniMap pannable zoomable nodeColor={(node) => String(node.style?.background || "#846c55")} maskColor="rgba(247,246,241,.75)" />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

export default GraphView;
