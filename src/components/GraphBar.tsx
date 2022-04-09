import { Grid, ButtonGroup } from "@mui/material";
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
    <Grid container spacing={2}>
      <Grid item xs={10}></Grid>
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
