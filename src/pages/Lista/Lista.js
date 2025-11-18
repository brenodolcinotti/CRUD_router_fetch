import React, {useState, useEffect} from "react";
import "./Lista.css"

function Lista(){

    const [editingId, setEditingId] = useState("")
    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState("")
    const [list, setList]= useState([])

    const viewCadastro = async() => {
        try {
            const response = await fetch("http://localhost:3000/cadastro")
            const data = await response.json();
            setList(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        viewCadastro();
    }, [])


    const handleSave = async(id) => {
        try {
            const response = await fetch(`http://localhost:3000/cadastro/${id}`, {
                method: "PUT",
                headers:  {"Content-Type" : "application/json"},
                body:JSON.stringify({"name": newName, "phone": newPhone})
            })
            const data = await response.json();
            console.log("Usuário alterado com sucesso!: ", data)
            viewCadastro()
            setNewName("")
            setNewPhone("")

        }catch(error){
            console.error("ERROR: ", error)
        }
        setEditingId("")
    }

   const handleEdit = (id) => {
        const itemToEdit = list.find(l => l.id === id);

        if (itemToEdit) {
            setNewName(itemToEdit.name); 
            setNewPhone(itemToEdit.phone);
        }

        setEditingId(id);
    } 

    const handleDelete = async(id) => {
        try {
            const response = await fetch(`http://localhost:3000/cadastro/${id}`, {
                method: "DELETE"
            })

            if(response.status !== 404){
                console.log("Usuário removido com sucesso")
            }
            else{
                console.log("Usuário inexistente")
            }
            viewCadastro()
        } catch (error) {
             console.error("ERROR: ", error)
        }
    }

    return(
        <div className="lista-container">
            <h2>Lista de contatos</h2>
            {list.length === 0 ? <p>Nenhum contato cadastrado</p> : (
                <ul>
                    {
                        list.map((l) => (
                            <li key={l.id}>
                                {editingId === l.id ? 
                                (<>
                                    <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    >
                                    </input>
                                    <input
                                    type="text"
                                    value={newPhone}
                                    onChange={(e) => setNewPhone(e.target.value)}
                                    >
                                    </input>
                                    <button onClick={() => handleSave(l.id)}>Salvar</button>
                                </>)
                                :
                                (
                                    <>
                                        <span>{l.name} - {l.phone}</span>
                                        <button onClick={() => handleEdit(l.id)}>Editar</button>
                                        <button onClick={() => handleDelete(l.id)}>Deletar</button>
                                    </>
                                )

                            }
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    )

}
export default Lista;