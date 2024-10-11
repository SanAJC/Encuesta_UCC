import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  const loadingDots = {
    animate: {
      opacity: [0, 1, 0],
      y: ["0%", "-20%", "0%"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <img
            src="https://i0.wp.com/udualc.org/wp-content/uploads/2021/08/logo-UCC-Universidad-cooperativa-de-colombia.jpg?w=800&ssl=1"
            alt="Universidad Cooperativa de Colombia Logo"
            width="450"
            height="150"
            className="rounded-lg"
          />
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              scale: [1.1, 1.2, 1.1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ filter: "blur(20px)" }}
          />
        </motion.div>
        <div className="mt-8 text-2xl font-semibold text-white flex items-center justify-center">
          <span className="mr-2">Cargando</span>
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              variants={loadingDots}
              animate="animate"
              transition={{ delay: index * 0.3 }}
              className="inline-block w-2 h-2 bg-white rounded-full mx-1"
            />
          ))}
        </div>
      </div>
      <p className="mt-6 text-white text-opacity-80 text-sm">
        Estamos preparando todo para ti. Por favor, espera un momento.
      </p>
    </div>
  );
};

export default LoadingSpinner;
