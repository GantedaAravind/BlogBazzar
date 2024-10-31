
import { motion, useScroll } from "framer-motion";
const ScrollProgessBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className = {"h-1 w-full bg-purple-500"}>
      <motion.div style={{ scaleX: scrollYProgress }} />
    </div>
  );
};

export default ScrollProgessBar;
