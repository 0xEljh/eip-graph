import { createContext } from "react";

export interface Info {
  title: string;
  content: string | JSX.Element;
}

const InfoContext = createContext<Info[]>([]);

export default InfoContext;
