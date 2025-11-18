import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css"

// importação das páginas
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cadastro from "./pages/Cadastro/Cadastro";
import Lista from "./pages/Lista/Lista";

// importação do NavBar (menu principal)
import NavBar from "./components/NavBar/NavBar";

function App(){
  // estado global simples para login
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // função de login
  const handleLogin = (username, password) => {
    if(username === "admin" && password === "123"){
      setIsAuthenticated(true);
    }
    else{
      alert("Usuário ou senha inválidos")
    }
  };

  // função de Logout
  const handleLogout = () => {
    setIsAuthenticated(false)
  };

  return(
    <Router>
      {isAuthenticated && <NavBar onLogout={handleLogout}/>}
      <Routes>
        <Route
        path = "/login"
        element = {
          isAuthenticated ? <Navigate to="/"/> : <Login onLogin = {handleLogin}/>
        }
        />
        
        <Route
        path = "/"
        element = {isAuthenticated ? <Home/> : <Navigate to = "/login"/>}
        />

        <Route
        path = "/cadastro"
        element = {
          isAuthenticated ? (<Cadastro contacts = {contacts} setContacts = {setContacts}/>) : (<Navigate to = "/login"/>)
        }
        />

        <Route
        path = "/lista"
        element = {
          isAuthenticated ? (<Lista contacts = {contacts} setContacts = {setContacts}/>) : (<Navigate to = "/login"/>)
        }
        />

        <Route
        path = "*"
        element = {<Navigate to = "/login"/>}
        />

      </Routes>
    </Router>
  );
}
export default App;

