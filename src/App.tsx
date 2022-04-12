import ForceGraph, {
  NodeObject,
  ForceGraphMethods,
} from "react-force-graph-2d";
import { data } from "./data";
import "./App.css";

import { useState, useRef, useCallback } from "react";
import { useCycle } from "framer-motion";

import InfoContext, { Info } from "./services/InfoContext";
import SideBar from "./components/SideBar";
import {
  NodeObj,
  NodePredicate,
  collectNodeDetails,
} from "./services/GraphNode";
import GraphBar from "./components/GraphBar";

function App() {
  // preprocess data:
  data.links.forEach((link) => {
    const srcNode: NodeObject | undefined = data.nodes.find(
      (node) => node.id === link.source
    );
    const tgtNode: NodeObject | undefined = data.nodes.find(
      (node) => node.id === link.target
    );
    const src = srcNode as NodeObj;
    const tgt = tgtNode as NodeObj;
    if (src && tgt) {
      !src.neighbours && (src.neighbours = []);
      !tgt.neighbours && (tgt.neighbours = []);

      src.neighbours.push(tgt);
      tgt.neighbours.push(src);

      !src.links && (src.links = []);
      !tgt.links && (tgt.links = []);
      src.links.push(link);
      tgt.links.push(link);
    }
  });

  const [details, setDetails] = useState<Info[]>([]);
  const [menuOpen, toggleMenu] = useCycle(false, true);

  const [searchNode, setSearchNode] = useState<string | null>(null);
  const [highlightNodes, setHighlightNodes] = useState<Set<NodeObj>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [primaryNode, setPrimaryNode] = useState<NodeObject | null>(null);
  const NODE_R = 5;

  const figRef = useRef<ForceGraphMethods>();
  const centerCamera = (x: number, y: number) => {
    if (figRef.current) {
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(x, y);
      figRef.current.centerAt(x * distRatio, y * distRatio, 3000);
      figRef.current.zoom(1.5, 3000);
    }
  };

  const focusNode = (node: NodeObject) => {
    const nodeObj = node as NodeObj;
    setDetails(collectNodeDetails(nodeObj));
    centerCamera(nodeObj.x, nodeObj.y);
    if (!menuOpen) {
      toggleMenu();
    }
    focusSubgraph(node);
  };
  const handleClick = (node: NodeObject) => {
    focusNode(node);
  };
  const handleSearch = (nodeName: string | null) => {
    setSearchNode(nodeName);
    // find the node:
    const node = data.nodes.find((node: NodeObject) => {
      const nodeObj = node as NodeObj;
      return nodeObj.name === nodeName;
    });
    if (node) {
      focusNode(node);
    }
  };

  const [visFunctions, setVisFunctions] = useState<NodePredicate[]>([]);
  const handleVisibility = (node: NodeObject) => {
    const nodeObj = node as NodeObj;
    return visFunctions.reduce((acc, func) => func(nodeObj) && acc, true);
  };

  const [highlights, setHighlights] = useState<NodePredicate[]>([]);
  const handleColor = (node: NodeObject) => {
    const nodeObj = node as NodeObj;
    return highlights.reduce((acc, func) => func(nodeObj) || acc, false)
      ? "#1f78b4"
      : "#bfd2e0";
  };

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const focusSubgraph = (node: NodeObject | null) => {
    const nodeObj = node as NodeObj;
    highlightNodes.clear();
    highlightLinks.clear();
    if (nodeObj) {
      highlightNodes.add(nodeObj);
      if (nodeObj.neighbours && nodeObj.links) {
        nodeObj.neighbours.forEach((neighbour: NodeObj) => {
          highlightNodes.add(neighbour);
        });
        nodeObj.links.forEach((link) => highlightLinks.add(link));
      }
    }

    setPrimaryNode(nodeObj || null);
    updateHighlight();
  };

  const paintRing = useCallback(
    (node, ctx) => {
      // add ring just for highlighted nodes
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
      ctx.fillStyle = node === primaryNode ? "red" : "orange";
      ctx.fill();
    },
    [primaryNode]
  );

  return (
    <div className="App">
      <header>
        <h1>Graph Visualization of Ethereum Improvement Protocols</h1>
      </header>

      <InfoContext.Provider value={details}>
        <SideBar isOpen={menuOpen} toggleOpen={toggleMenu} />
      </InfoContext.Provider>
      <GraphBar
        setFilters={setVisFunctions}
        setHighlights={setHighlights}
        searchNode={searchNode}
        onSearchChange={handleSearch}
        graphData={data}
      />
      <ForceGraph
        ref={figRef}
        graphData={data}
        nodeRelSize={NODE_R}
        onNodeClick={handleClick}
        nodeAutoColorBy="category"
        linkDirectionalParticles={(link) => (highlightLinks.has(link) ? 3 : 1)}
        linkDirectionalParticleSpeed={(d) => Math.random() * 0.01}
        linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
        linkDirectionalParticleWidth={(link) =>
          highlightLinks.has(link) ? 5 : 3
        }
        nodeVisibility={handleVisibility}
        nodeColor={highlights.length > 0 ? handleColor : undefined}
        nodeCanvasObjectMode={(node) => {
          const nodeObj = node as NodeObj;
          return highlightNodes.has(nodeObj) ? "before" : undefined;
        }}
        nodeCanvasObject={paintRing}
      />
    </div>
  );
}

export default App;
