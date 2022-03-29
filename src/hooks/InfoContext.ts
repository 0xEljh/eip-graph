import { createContext } from "react";

export interface Info {
  title: string;
  content: string;
}

const InfoContext = createContext<Info[]>([]);

export default InfoContext;
