import ForceGraph, {
  NodeObject,
  ForceGraphMethods,
} from "react-force-graph-2d";
import { data } from "./data";
import "./App.css";

import { useState, useRef } from "react";

import InfoContext, { Info } from "./services/InfoContext";
import SideBar from "./components/SideBar";
import {
  NodeObj,
  NodePredicate,
  collectNodeDetails,
} from "./services/GraphNode";
import GraphBar from "./components/GraphBar";

function App() {
  // preprocess the data into the form that force graph expects
  // animated sidebar:

  const [details, setDetails] = useState<Info[]>([]);

  const figRef = useRef<ForceGraphMethods>();
  const centerCamera = (x: number, y: number) => {
    if (figRef.current) {
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(x, y);
      figRef.current.centerAt(x * distRatio, y * distRatio, 3000);
      figRef.current.zoom(1.5, 3000);
    }
  };

  const handleClick = (node: NodeObject) => {
    const nodeObj = node as NodeObj;
    console.log(nodeObj.color);
    setDetails(collectNodeDetails(nodeObj));
    centerCamera(nodeObj.x, nodeObj.y);
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
      ? "#b2df8a"
      : "#5f94b8";
  };

  return (
    <div className="App">
      <header>
        <h1>Graph Visualization of Ethereum Improvement Protocols</h1>
      </header>

      <InfoContext.Provider value={details}>
        <SideBar />
      </InfoContext.Provider>
      <GraphBar
        setFilters={setVisFunctions}
        setHighlights={setHighlights}
        setColors={setVisFunctions}
      />
      <ForceGraph
        ref={figRef}
        graphData={data}
        onNodeClick={handleClick}
        nodeAutoColorBy="category"
        linkDirectionalParticles={1}
        linkDirectionalParticleSpeed={(d) => Math.random() * 0.003}
        nodeVisibility={handleVisibility}
        nodeColor={highlights.length > 0 ? handleColor : undefined}
      />
    </div>
  );
}

export default App;
