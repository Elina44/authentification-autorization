import { useState, useContext } from "react";
import GoHomeButton from "@components/GoHomeButton";
import axios from "axios";
// Pour retourner sur la page de connexion
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function Connexion() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Requete de connexion -> stocker le token dans le local storage -> ajouter le token dans les autorisations
    // -> rediriger l'utilisateur vers la page d'accueil=> avec navigate
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, { ...formState })
      .then((response) => response.data)
      .then((data) => {
        window.localStorage.setItem("authToken", data.token);
        axios.defaults.headers.Authorization = `Bearer ${data.token}`;
        setIsAuthenticated(true);
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <GoHomeButton />
      <h2>Formulaire de connexion</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="email"
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
        <input type="submit" />
      </form>
    </>
  );
}
