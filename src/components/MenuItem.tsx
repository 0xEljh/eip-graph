import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({
  i,
  title,
  content,
}: {
  i: number;
  title: string;
  content: string | JSX.Element;
}) => {
  const style = {
    "border-radius": "10px",
    border: `2px solid ${colors[i]}`,
    padding: "10px",
  };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-placeholder" style={style}>
        <h2>{title}</h2>
        <br />
        <p>{content}</p>
      </div>
    </motion.li>
  );
};
