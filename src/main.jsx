// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { GoogleOAuthProvider } from '@react-oauth/google'
// import AppRoutes from './routes.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <GoogleOAuthProvider clientId="326992678879-liepirbddk38esnfarb7ue1fecq0pu75.apps.googleusercontent.com">
//     <AppRoutes />
//   </GoogleOAuthProvider>
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
