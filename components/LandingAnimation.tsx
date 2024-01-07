'use client'
import React from 'react';
import { motion, useAnimate } from "framer-motion";



export const LandingAnimations: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <motion.div
      className="landinganimation flex flex-grow flex-col"
      animate={{
        scale: [1, 1.2, 1, 1.2, 1, 1.2, 1, 1.2, 1],
        rotate: [0, 0, 180, 180, 180, 180, 0, 0, 0],
      }}
      transition={{
        duration: 1.6,
        ease: "easeInOut",
        times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, .875, 1],
        repeat: 8,
      }}
    >{children}</motion.div>
  );
}
