import React,{useEffect, useState} from "react";

function PanelUsuario (){

    const [dataUsuario,setDataUsuario] = useState(null)


    useEffect(()=>{
        const data = async ()=>{
            try {
                const res= await fetch("http://localhost:5000/usuarios",{
                    method: POST,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(usuario)
                })
                if (!response.ok) {
                    throw new Error("no se encuentran los datos");
                    
                }
                setDataUsuario=res.json()
            } catch (error) {
                setError(error)
            }
        }
    },[]);
    return (
        <div>
            <h1> Panel de usuario</h1>

            <p>{data.nombre_usuario}</p>
            <p>{data.email}</p>
        </div>
    )
}

export default PanelUsuario;