import { useState } from "react";
import { NodeObj, NodePredicate } from "../services/GraphNode";
import SwitchMenu from "./SwitchMenu";
import {
  FormControlLabel,
  Switch,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

interface HighlightBarProps {
  setHighlights: (highlights: NodePredicate[]) => void;
}

const highlightERC = (node: NodeObj) => node.category === "ERC";
const highlightCore = (node: NodeObj) => node.category === "Core";
const highlightNetworking = (node: NodeObj) => node.category === "Networking";
const highlightInterface = (node: NodeObj) => node.category === "Interface";
const highlightMeta = (node: NodeObj) => node.category === "Meta";
const highlightInfo = (node: NodeObj) => node.category === "Informational";
const highlightFinal = (node: NodeObj) => node.status === "Final";

const highlights: { [key: string]: NodePredicate } = {
  highlightERC,
  highlightCore,
  highlightFinal,
};

const HightlightBar = ({ setHighlights }: HighlightBarProps) => {
  const [activeHighlights, setActiveHighlights] = useState<NodePredicate[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      const newActiveHighlights = [...activeHighlights, highlights[name]];
      setActiveHighlights(newActiveHighlights);
      setHighlights(newActiveHighlights);
    } else {
      const newActiveHighlights = activeHighlights.filter(
        (f) => f !== highlights[name]
      );
      setActiveHighlights(newActiveHighlights);
      setHighlights(newActiveHighlights);
    }
  };

  return (
    <SwitchMenu title="Higlight">
      <FormControlLabel
        control={<Switch name="highlightERC" onChange={handleChange} />}
        label="Highlight ERC"
      />

      <FormControlLabel
        control={<Switch name="highlightCore" onChange={handleChange} />}
        label="Highlight Core"
      />

      <FormControlLabel
        control={<Switch name="highlightFinal" onChange={handleChange} />}
        label="Highlight Final"
      />
    </SwitchMenu>
  );
};

export default HightlightBar;
