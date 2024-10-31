import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const ScrollProgessBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className = {"h-1 w-full"}>
      <motion.div style={{ scaleX: scrollYProgress }} />
    </div>
  );
};

export default ScrollProgessBar;
