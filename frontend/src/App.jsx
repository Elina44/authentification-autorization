import Connexion from "@pages/Connexion";
import { useState } from "react";
import Home from "@pages/Home";
import SignUp from "@pages/SignUp";
import Movies from "@pages/Movies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "@pages/Users";
import AuthAPI from "@services/AuthAPI";
import Profile from "@pages/Profile";
import UnauthorizedPage from "@pages/UnauthorizedPage";
import PrivateRoute from "@components/PrivateRoute";
import AuthContext from "./contexts/AuthContext";
// AuthContext
AuthAPI.setup();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated
  );
  // On utilise la méthode provider dans le Context pour vérifier les conditions d'aacès aux routes
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/" element={<Connexion />} />
          <Route path="/signup/" element={<SignUp />} />
          <Route
            path="/movies/"
            element={
              <PrivateRoute>
                <Movies />
              </PrivateRoute>
            }
          />
          <Route path="/users/" element={<Users />} />
          <Route path="/my-profile/" element={<Profile />} />
          <Route path="/unauthorized/" element={<UnauthorizedPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
/* On utilise <PrivateRoute> pour sécuriser les routes. Ici, on veut que l'accès à movies ne soit QUE pour les pers connectées */
