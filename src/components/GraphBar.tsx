import { Grid, ButtonGroup, TextField, Autocomplete } from "@mui/material";
import FilterBar from "./FilterBar";
import HighlightBar from "./HighlightBar";
import { NodePredicate } from "../services/GraphNode";

import { useState } from "react";
import { GraphData } from "react-force-graph-2d";

interface GraphBarProps {
  setFilters: (filters: NodePredicate[]) => void;
  setHighlights: (highlights: NodePredicate[]) => void;
  searchNode: string | null;
  onSearchChange: (node: string | null) => void;
  graphData: GraphData;
}

const GraphBar = ({
  setFilters,
  setHighlights,
  searchNode,
  onSearchChange,
  graphData,
}: GraphBarProps) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Grid container spacing={2}>
      <Grid item xs={7}></Grid>
      <Grid item xs={3}>
        <Autocomplete
          value={searchNode}
          onChange={(event: any, newValue: string | null) => {
            onSearchChange(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={graphData.nodes.map((node: any) => node.name)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search EIPs" />
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <ButtonGroup>
          <FilterBar setFilters={setFilters} />
          <HighlightBar setHighlights={setHighlights} />
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default GraphBar;
