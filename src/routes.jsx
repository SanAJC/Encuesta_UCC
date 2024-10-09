import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Form from './pages/Form';

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/form" /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route 
          path="/form" 
          element={isAuthenticated ? <Form /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
