import { useState } from "react";
import { NodeObj, NodePredicate } from "../services/GraphNode";
import SwitchMenu from "./SwitchMenu";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

interface FilterBarProps {
  setFilters: (filters: NodePredicate[]) => void;
}

const hideWithdrawn = (node: NodeObj) => !node.status.includes("Withdrawn");
const hideStagnant = (node: NodeObj) => !node.status.includes("Stagnant");
const filters: { [key: string]: NodePredicate } = {
  hideWithdrawn,
  hideStagnant,
};

const FilterBar = ({ setFilters }: FilterBarProps) => {
  const [activeFilters, setActiveFilters] = useState<NodePredicate[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      const newActiveFilters = [...activeFilters, filters[name]];
      setActiveFilters(newActiveFilters);
      setFilters(newActiveFilters);
    } else {
      const newActiveFilters = activeFilters.filter((f) => f !== filters[name]);
      setActiveFilters(newActiveFilters);
      setFilters(newActiveFilters);
    }
  };

  return (
    <SwitchMenu title="Filter">
      <FormControlLabel
        control={<Switch name="hideWithdrawn" onChange={handleChange} />}
        label="Hide Withdrawn"
      />
      <FormControlLabel
        control={<Switch name="hideStagnant" onChange={handleChange} />}
        label="Hide Stagnant"
      />
    </SwitchMenu>
  );
};

export default FilterBar;
