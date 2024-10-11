import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/Loading";

const Form = () => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    message_1: "",
    message_2: "",
  });
  const [documentenviado, setDocumentenviado] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    // Verificar si el usuario ya ha enviado el formulario
    const ComprobarEnvio = async () => {
      if (user) {
        const userRef = doc(db, "Encuesta", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setDocumentenviado(true); // Si el documento existe, el usuario ya envió el formulario
        }
      }
      setLoading(false); // Deja de mostrar el loading cuando se termina la verificación
    };
    ComprobarEnvio();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    // Guardar los datos del formulario en Firestore
    const userRef = doc(db, "Encuesta", user.uid);
    await setDoc(userRef, {
      id: formData.id,
      email: formData.email,
      message_1: formData.message_1,
      message_2: formData.message_2,
      submittedAt: new Date(),
    });

    navigate("/VistadeGracias");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  // Mostrar el spinner de carga mientras se verifica si el usuario ha enviado el formulario
  if (loading) {
    return <LoadingSpinner />;
  }

  // Mostrar el mensaje de agradecimiento si ya envió el formulario
  if (documentenviado) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-center p-8 space-y-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_ucc_2018(CURVAS)-01-KXza5A0m9Pk5KyKw4u2RcArNVlKVGh.png"
            alt="Universidad Cooperativa de Colombia Logo"
            className="mx-auto"
            style={{ width: "300px", height: "100px" }}
          />
          <div className="space-y-4">
            <svg
              className="w-16 h-16 mx-auto text-[#8CC63F]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-[#00A9CE]">
              Formulario ya enviado
            </h2>
            <p className="text-gray-600 text-lg">
              Ya has enviado el formulario. ¡Gracias por tu participación!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-6 rounded-full bg-[#8CC63F] hover:bg-[#7AB52F] transition-colors duration-300 text-white font-semibold text-lg"
          >
            OK
          </button>
          <p className="text-sm text-gray-500">
            Si tienes alguna pregunta, por favor contacta a
            Correspondencia.san@ucc.edu.co
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#8CC63F] bg-opacity-10 py-12">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#8CC63F] rounded-full -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#00A9CE] rounded-full translate-x-20 translate-y-20"></div>
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_ucc_2018(CURVAS)-01-KXza5A0m9Pk5KyKw4u2RcArNVlKVGh.png"
              alt="Universidad Cooperativa de Colombia Logo"
              className="w-64 h-auto"
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-[#00A9CE] mb-6">
            Formulario de Retroalimentación
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="student-id"
                className="text-[#8CC63F] font-semibold"
              >
                ID Estudiantil
              </label>
              <input
                id="student-id"
                name="id" // Asegúrate de que el nombre sea correcto
                type="text"
                required
                className="rounded-full border-[#8CC63F] border w-full p-2"
                value={formData.id} // Cambiado a formData.id
                onChange={handleChange} // Cambiado para usar handleChange
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="institutional-email"
                className="text-[#8CC63F] font-semibold"
              >
                Correo Institucional
              </label>
              <input
                id="institutional-email"
                name="email"
                type="email"
                placeholder="tu@ucc.edu.co"
                required
                className="rounded-full border-[#8CC63F] border w-full p-2"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="opinion" className="text-[#8CC63F] font-semibold">
                Opinión sobre la facultad (Máximo 400 caracteres)
              </label>
              <textarea
                id="opinion"
                name="message_1"
                placeholder="Comparte tu opinión aquí..."
                className="rounded-lg border-[#8CC63F] border w-full p-2"
                maxLength={400}
                value={formData.message_1}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 text-right">
                {formData.message_1.length}/400 caracteres
              </p>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="solution"
                className="text-[#8CC63F] font-semibold"
              >
                ¿Cómo solucionarías el problema en caso de que exista?
              </label>
              <textarea
                id="solution"
                name="message_2"
                placeholder="Describe tu solución aquí..."
                className="rounded-lg border-[#8CC63F] border w-full p-2"
                value={formData.message_2}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#8CC63F] hover:bg-[#7AB52F] transition-colors duration-300 p-2 text-white font-bold"
            >
              Enviar Retroalimentación
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
