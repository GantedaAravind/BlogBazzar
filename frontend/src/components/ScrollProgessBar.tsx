import { motion, useScroll } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="h-1 w-full bg-transparent fixed top-0 left-0 z-1000">
      <motion.div
        style={{
          scaleX: scrollYProgress,        // Scale horizontally with scroll progress
          transformOrigin: "0 0",         // Scale from the left
          width: "100%",                  // Set width for the scaling effect
          height: "4px",                  // Adjust thickness of the progress bar
          backgroundColor: "#7E22CE",     // Progress bar color
          borderRadius: 100,
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
