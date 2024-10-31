import { motion, useScroll } from "framer-motion";
const ScrollProgessBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className={"h-1 w-full bg-purple-500"}>
      <motion.div
        style={{
          scaleX: scrollYProgress, // Scale horizontally with scroll progress
          transformOrigin: "0 0", // Scale from the left
          height: "4px", // Adjust thickness of the progress bar
          backgroundColor: "#7E22CE", // Progress bar color
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          borderRadius: 100,
          zIndex: 1000,
        }}
      />
    </div>
  );
};

export default ScrollProgessBar;
