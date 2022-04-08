import { Grid } from "@mui/material";
import FilterBar from "./FilterBar";
import HighlightBar from "./HighlightBar";
import { NodePredicate } from "../services/GraphNode";

interface GraphBarProps {
  setFilters: (filters: NodePredicate[]) => void;
  setHighlights: (highlights: NodePredicate[]) => void;
  setColors: (colors: NodePredicate[]) => void;
}

const GraphBar = ({ setFilters, setHighlights, setColors }: GraphBarProps) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}></Grid>
      <Grid item xs={2}>
        <FilterBar setFilters={setFilters} />
      </Grid>
      <Grid item xs={2}>
        <HighlightBar setHighlights={setHighlights} />
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default GraphBar;
