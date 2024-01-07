'use client'
import React from 'react';
import { motion } from "framer-motion";



export const LandingAnimations:React.FC<React.PropsWithChildren<{}>> = ({ children })=> {
  return (
    <motion.div
      className="landinganimation"
      animate={{
        scale: [1, 0.5, 0.9, 0.6, 0.2],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,   
        repeatDelay: 1,
      }}
    >{children}</motion.div>
  );
}