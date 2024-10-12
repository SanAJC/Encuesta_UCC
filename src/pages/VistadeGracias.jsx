import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { motion } from "framer-motion";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-center p-8 space-y-6"
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_ucc_2018(CURVAS)-01-KXza5A0m9Pk5KyKw4u2RcArNVlKVGh.png"
          alt="Universidad Cooperativa de Colombia Logo"
          className="mx-auto"
          style={{ width: "300px", height: "100px" }}
        />

        <h1 className="text-3xl font-bold text-[#00A9CE]">
          ¡Gracias por llenar el formulario!
        </h1>
        <p className="text-gray-600 text-lg">
          Agradecemos tu participación en la encuesta estudiantil.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-6 rounded-full bg-[#8CC63F] hover:bg-[#7AB52F] transition-colors duration-300 text-white font-semibold text-lg"
          >
            OK
          </button>
        </motion.div>
        <p className="text-sm text-gray-500">
          Tu opinión es importante para nosotros y nos ayuda a mejorar.
        </p>
      </motion.div>
    </div>
  );
};

export default ThankYou;
