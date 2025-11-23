import { useEffect } from "react";
import { useAuth } from "./auth/authContext.tsx";
import { auth, db } from "./auth/InitializeFireBase.ts";
import AuthLayout from "./layouts/authLayout.tsx";
import AuthRoutes from "../src/routes/authRoutes.tsx";
import PrivateRoutes from "../src/routes/privateRoutes.tsx";
import { Routes, useNavigate, Route } from "react-router-dom";

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  return (
    <div className="App">
      <Routes>{user ? PrivateRoutes : AuthRoutes}</Routes>
    </div>
  );
}

export default App;
