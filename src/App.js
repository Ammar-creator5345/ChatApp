import { useEffect } from "react";
// import { auth, db } from "./auth/InitializeFireBase.ts";
// import AuthLayout from "./layouts/authLayout.tsx";
import AuthRoutes from "../src/routes/authRoutes.tsx";
import PrivateRoutes from "../src/routes/privateRoutes.tsx";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useAuth } from "./features/auth/context/authContext.tsx";

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="App">
      <Routes>{user ? PrivateRoutes : AuthRoutes}</Routes>
    </div>
  );
}

export default App;
