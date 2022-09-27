import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../services/AuthAPI";

export default function Home() {
  // On met une authentification dans la page Home pour jouer avec visible/pas visible les boutons
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // On met dans la méthode pour se déconnecter
  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
  };

  // On entoure les boutons qu'on veut voir si on est connecté
  return (
    <header className="App-header">
      <nav>
        <ul>
          <Link to="/">
            <li>Accueil - accessible par tous les visiteurs</li>
          </Link>
          {!isAuthenticated && (
            <>
              <Link to="/login">
                <li>Connexion</li>
              </Link>
              <Link to="/signup">
                <li>Inscription</li>
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link to="/movies">
                <li>
                  Films -{" "}
                  <em>accessible par tous les utilisateurs connectés</em>
                </li>
              </Link>
              <Link to="/users">
                <li>
                  Utilisateurs - <em>accessible par les comptes admin</em>
                </li>
              </Link>
              <Link to="/my-profile">
                <li>
                  Mon profil -{" "}
                  <em>accessible que par l'utilisateur connecté concerné</em>
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>
      {isAuthenticated && (
        <button type="button" onClick={() => handleLogout()}>
          Deconnexion
        </button>
      )}
    </header>
  );
}
// On entoure le bouton déconnexion pour qu'il s'affiche seulement quand on est est connecté
// donc quand la méthode isAuthenticated est lancée
