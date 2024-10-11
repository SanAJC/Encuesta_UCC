import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Login from "./pages/Login";
import Form from "./pages/Form";
import VistadeGracias from "./pages/VistadeGracias";
import LoadingSpinner from "./components/Loading";

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/form" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/form"
          element={isAuthenticated ? <Form /> : <Navigate to="/" />}
        />
        <Route
          path="/VistadeGracias"
          element={isAuthenticated ? <VistadeGracias /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
