import { useState } from "react";
import GoHomeButton from "@components/GoHomeButton";
import axios from "axios";

export default function SignUp() {
  const [formState, setFormState] = useState({
    email: "",
    firstname: "",
    lastname: "",
    city: "",
    language: "",
    password: "",
  });

  const handleSignUp = () => {
    // Requete création d'un utilisateur
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
      ...formState,
    });
  };

  return (
    <>
      <GoHomeButton />
      <h2>Formulaire d'inscription</h2>
      <form onSubmit={() => handleSignUp()}>
        <input
          type="text"
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          placeholder="Email"
        />
        <br />
        <input
          type="text"
          value={formState.firstname}
          onChange={(e) =>
            setFormState({
              ...formState,
              firstname: e.target.value,
            })
          }
          placeholder="Prénom"
        />
        <br />
        <input
          type="text"
          value={formState.lastname}
          onChange={(e) =>
            setFormState({
              ...formState,
              lastname: e.target.value,
            })
          }
          placeholder="Nom"
        />
        <br />
        <input
          type="text"
          value={formState.city}
          onChange={(e) =>
            setFormState({
              ...formState,
              city: e.target.value,
            })
          }
          placeholder="Ville"
        />
        <br />
        <input
          type="text"
          value={formState.language}
          onChange={(e) =>
            setFormState({
              ...formState,
              language: e.target.value,
            })
          }
          placeholder="Langage"
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
        <br />
        <input type="submit" value="S'inscrire" />
      </form>
    </>
  );
}
