import { useState } from "react";
import Login from "./pages/Login";
import Shell from "./components/Shell";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user] = useState({ nome: "Carlos Souza", email: "carlos.souza@empresa.com", perfil: "Administrador" });

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
  return <Shell user={user} onLogout={() => setLoggedIn(false)} />;
}
