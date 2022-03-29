import { ForceGraph2D } from "react-force-graph";
import { data } from "./dummy-data";
import "./App.css";

import { useState } from "react";
import { motion } from "framer-motion";

import InfoContext, { Info } from "./hooks/InfoContext";
import SideBar from "./components/SideBar";

type NodeObj = {
  id: string;
  name: string;
  val: number;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
};

function App() {
  // preprocess the data into the form that force graph expects
  // animated sidebar:

  const [details, setDetails] = useState<Info[]>([]);

  return (
    <div className="App">
      <header>
        <h1>Graph Visualization of Ethereum Improvement Protocols</h1>
      </header>
      <body>
        <InfoContext.Provider value={details}>
          <SideBar />
        </InfoContext.Provider>
        <ForceGraph2D
          graphData={data}
          onNodeClick={(node, event) => {
            const nodeObj = node as NodeObj;
            setDetails([{ title: "Summary", content: nodeObj.name }]);
          }}
        />
      </body>
    </div>
  );
}

export default App;
