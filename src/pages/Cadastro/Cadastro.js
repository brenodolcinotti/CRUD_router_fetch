import React, { useState } from "react";
import "./Cadastro.css"

function Cadastro(){

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/cadastro", {
                method: "POST",
                headers:  {"Content-Type" : "application/json"},
                body: JSON.stringify({"name": name, "phone" :  phone})
            })

             const data = await response.json();
             console.log("Usuário criado: ", data)

             setName("")
             setPhone("")
        } catch (error) {
            console.log("ERROR: erro ao adicionar:", error)
        }
    }

    return(
        <div className="cadastro-container">
            <h2>Cadastrar contato</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Digite o nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Digite o telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}
export default Cadastro;