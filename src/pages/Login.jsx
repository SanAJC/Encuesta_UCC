import React from 'react';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';  // API de Google para manejar el login
import '../styles/Login.css'
const Login = ({ setIsAuthenticated }) => {

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Login exitoso:", response);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      console.error("Error en el login:", error);
      setIsAuthenticated(false);
    },
  });

  return (
    <div className="login">
      <img src="./src/assets/ucc.png" alt="logo" id='logo' />
      <h1>Encuesta Estudiantil</h1>
      <span id='data'>Accede a todos los servicios universitarios con tu cuenta de Google</span>
      <br />
      <button className="custom-google-button" onClick={() => login()}>
        <img src="./src/assets/google.svg" id='google'/>
        <span id='inicio'>Iniciar sesión con Google</span>
      </button>
      <br />
      <p id ='hp'>Al iniciar sesión, aceptas nuestros</p>
      <p><strong>Terminos de servicios</strong> y <strong>Políticas de privacidad</strong></p>
      <br />
      <p>¿Necesitas ayuda? Contacta a</p>
      <a href="#"><strong id='ayuda'>Correspondencia.san@ucc.edu.co</strong></a>
    </div>
  );
};

export default Login;

