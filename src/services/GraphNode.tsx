import { NodeObject } from "react-force-graph-2d";
import { Info } from "./InfoContext";

export type NodeObj = NodeObject & {
  name: string;
  val: number;
  x: number;
  y: number;
  category: string;
  status: string;
  author: string | string[];
  url: string;
  summary?: string[];
  abstract?: string[];
  discussions?: string;
  bckgDimensions?: [number, number];
  color: string;
};

export type NodePredicate = (node: NodeObj) => boolean;

export function collectNodeDetails(node: NodeObj) {
  const details: Info[] = [];
  details.push({
    title: node.name,
    content: node.summary ? (
      <>
        {node.summary.map((text) => (
          <p>{text}</p>
        ))}
      </>
    ) : (
      ""
    ),
  });
  if (node.abstract) {
    details.push({
      title: "Abstract",
      content: (
        <>
          {node.abstract.map((text) => (
            <p>{text}</p>
          ))}
        </>
      ),
    });
  }
  details.push({
    title: "Relevant Links",
    content: (
      <>
        <a href={node.url}>Ethereum EIP Page</a>
        <br />
        {node.discussions ? (
          <a href={node.discussions}>Github Discussions Page</a>
        ) : null}
      </>
    ),
  });
  return details;
}
