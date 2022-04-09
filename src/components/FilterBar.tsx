import { useState } from "react";
import { NodeObj, NodePredicate } from "../services/GraphNode";
import SwitchMenu from "./SwitchMenu";
import { FormControlLabel, Switch } from "@mui/material";

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
    let newActiveFilters = [...activeFilters];
    if (checked) {
      newActiveFilters = [...activeFilters, filters[name]];
    } else {
      newActiveFilters = activeFilters.filter((f) => f !== filters[name]);
    }
    setActiveFilters(newActiveFilters);
    setFilters(newActiveFilters);
  };

  return (
    <SwitchMenu title="Filter">
      <FormControlLabel
        control={
          <Switch
            key="withdrawn"
            name="hideWithdrawn"
            onChange={handleChange}
            checked={activeFilters.includes(filters["hideWithdrawn"])}
          />
        }
        label="Hide Withdrawn"
      />
      <FormControlLabel
        control={
          <Switch
            key="stagnant"
            name="hideStagnant"
            onChange={handleChange}
            checked={activeFilters.includes(filters["hideStagnant"])}
          />
        }
        label="Hide Stagnant"
      />
    </SwitchMenu>
  );
};

export default FilterBar;
