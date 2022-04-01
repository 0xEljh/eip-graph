import ForceGraph, { NodeObject } from "react-force-graph-2d";
import { data } from "./dummy-data";
import "./App.css";

import React, { useState, useRef, useCallback } from "react";

import InfoContext, { Info } from "./hooks/InfoContext";
import SideBar from "./components/SideBar";

type NodeObj = NodeObject & {
  name: string;
  val: number;
  x: number;
  y: number;
  category: string;
  status: string;
  author: string | string[];
  url: string;
  bckgDimensions?: [number, number];
  color: string;
};

function App() {
  // preprocess the data into the form that force graph expects
  // animated sidebar:

  const [details, setDetails] = useState<Info[]>([]);

  // const figRef = useRef < React.MutableRefObject<ForceGraphMethods>();

  const handleClick = (node: NodeObject) => {
    const nodeObj = node as NodeObj;
    setDetails([
      { title: nodeObj.name, content: nodeObj.status },
      {
        title: "Discussion Page",
        content: <a href={nodeObj.url}>{nodeObj.url}</a>,
      },
    ]);

    // if (figRef.current) {
    //   const distance = 40;
    //   const distRatio = 1 + distance / Math.hypot(nodeObj.x, nodeObj.y);
    //   figRef.current.cameraPosition(
    //     { x: nodeObj.x * distRatio, y: nodeObj.y * distRatio },
    //     node,
    //     3000
    //   );
    // }
  };

  return (
    <div className="App">
      <header>
        <h1>Graph Visualization of Ethereum Improvement Protocols</h1>
      </header>

      <InfoContext.Provider value={details}>
        <SideBar />
      </InfoContext.Provider>
      <ForceGraph
        graphData={data}
        onNodeClick={handleClick}
        nodeAutoColorBy="category"
        linkDirectionalParticles={1}
        linkDirectionalParticleSpeed={(d) => Math.random() * 0.003}
        // nodeCanvasObject={(node, ctx, globalScale) => {
        //   const nodeObj = node as NodeObj;
        //   const label = nodeObj.id as string;
        //   const fontSize = 16 / globalScale;
        //   ctx.font = `${fontSize}px Sans-Serif`;
        //   const textWidth = ctx.measureText(label).width;
        //   const bckgDimensions: [number, number] = [
        //     textWidth + fontSize * 0.4,
        //     fontSize * 1.4,
        //   ]; // some padding

        //   if (node.x && node.y) {
        //     ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        //     ctx.fillRect(
        //       node.x - bckgDimensions[0] / 2,
        //       node.y - bckgDimensions[1] / 2,
        //       ...bckgDimensions
        //     );

        //     ctx.textAlign = "center";
        //     ctx.textBaseline = "middle";
        //     ctx.fillStyle = nodeObj.color;
        //     ctx.fillText(label, node.x, node.y);

        //     nodeObj.bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        //   }
        // }}
        // nodePointerAreaPaint={(n, color, ctx) => {
        //   const node = n as NodeObj;
        //   ctx.fillStyle = color;
        //   const bckgDimensions = node.bckgDimensions;
        //   bckgDimensions &&
        //     ctx.fillRect(
        //       node.x - bckgDimensions[0] / 2,
        //       node.y - bckgDimensions[1] / 2,
        //       ...bckgDimensions
        //     );
        // }}
      />
    </div>
  );
}

export default App;
