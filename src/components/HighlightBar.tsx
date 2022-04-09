import { useState } from "react";
import { NodeObj, NodePredicate } from "../services/GraphNode";
import SwitchMenu from "./SwitchMenu";
import { FormControlLabel, Switch } from "@mui/material";

interface HighlightBarProps {
  setHighlights: (highlights: NodePredicate[]) => void;
}

const highlightFinal = (node: NodeObj) => node.status === "Final";

const categories = ["ERC", "Core", "Networking", "Interface"];

const HightlightBar = ({ setHighlights }: HighlightBarProps) => {
  const [activeHighlights, setActiveHighlights] = useState<{
    [key: string]: NodePredicate;
  }>({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    let newActiveHighlights: {
      [key: string]: NodePredicate;
    } = {};
    if (checked) {
      newActiveHighlights = {
        ...activeHighlights,
        [name]: (node: NodeObj) => node.category === name,
      };
    } else {
      newActiveHighlights = Object.keys(activeHighlights)
        .filter((f) => f !== name)
        .reduce(
          (acc, curr) => ({ ...acc, [curr]: activeHighlights[curr] }),
          {}
        );
    }
    setActiveHighlights(newActiveHighlights);
    setHighlights(Object.values(newActiveHighlights));
  };

  return (
    <SwitchMenu title="Highlight">
      {categories.map((category, index) => (
        <FormControlLabel
          key={index}
          control={
            <Switch
              key={index}
              name={category}
              onChange={handleChange}
              checked={category in activeHighlights}
            />
          }
          label={category}
        />
      ))}
    </SwitchMenu>
  );
};

export default HightlightBar;
