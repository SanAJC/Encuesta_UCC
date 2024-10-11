import React, { useState } from "react";
import { motion } from "framer-motion";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Login = ({ setIsAuthenticated }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Login exitoso:", result.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error en el login:", error);
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#8CC63F] rounded-full -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#00A9CE] rounded-full translate-x-20 translate-y-20"></div>

        <div className="relative z-10 flex flex-col items-center space-y-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_ucc_2018(CURVAS)-01-KXza5A0m9Pk5KyKw4u2RcArNVlKVGh.png"
            alt="Universidad Cooperativa de Colombia Logo"
            width="250"
            height="83"
          />

          <h1 className="text-3xl font-bold text-[#00A9CE] text-center">
            Encuesta Estudiantil
          </h1>
          <p className="text-gray-600 text-center max-w-sm">
            Accede a todos los servicios universitarios con tu cuenta
            institucional de Google
          </p>
        </div>

        <motion.button
          className={`btn1 w-full py-4 px-6 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-4 ${
            isHovered
              ? "bg-white text-[#8CC63F] border-2 border-[#8CC63F] shadow-lg"
              : "bg-[#8CC63F] text-white shadow-md"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleGoogleLogin} // Llamamos a la función de login aquí
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>Iniciar sesión con Google</span>
        </motion.button>

        <div className="text-center text-sm text-gray-600">
          <p>Al iniciar sesión, aceptas nuestros</p>
          <div className="mt-2 space-x-2">
            <a href="#" className="text-[#00A9CE] hover:underline font-medium">
              Términos de servicio
            </a>
            <span>y</span>
            <a href="#" className="text-[#00A9CE] hover:underline font-medium">
              Política de privacidad
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-sm text-gray-700"
        >
          <p>¿Necesitas ayuda? Contacta a</p>
          <a
            href="mailto:Correspondencia.san@ucc.edu.co"
            className="text-[#8CC63F] hover:underline font-medium"
          >
            Correspondencia.san@ucc.edu.co
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
