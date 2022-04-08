import { useContext } from "react";
import InfoContext from "../services/InfoContext";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Menu = () => {
  const nodeInfo = useContext(InfoContext);

  return (
    <motion.ul className="menu-ul" variants={variants}>
      {nodeInfo.map((info, i) => (
        <MenuItem title={info.title} content={info.content} i={i} key={i} />
      ))}
    </motion.ul>
  );
};

export default Menu;
