import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alertas";


function Login() {

  const [credenciales,setCredenciales] = useState ({
    nombre_usuario:"",
    contraseña:""
  })

  const [error, setError] = useState("");
  const [visibleAlerta,setVisibleAlerta] = useState(false)
  const [tipoAlerta,setTipoAlerta]= useState("") 
  const navigate=useNavigate()

  const manejarCambio=(e)=>{
    const {name , value} =e.target;
    setCredenciales({ ...credenciales, [name]: value })
    setError("")
  }

  const manejarEnvio= async (e)=>{
    e.preventDefault();

    try {

      const res = await fetch('http://localhost:5000/usuarios/login',{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciales)
      });
      const data= await res.json()

      if(!res.ok){
        setError(data.error || "error al iniciar la sesion")
        setTipoAlerta("error")
        setVisibleAlerta(true)
        return
      } 
      navigate("/panelUsuarios")

    } catch (error) {
      setError("Error en el servidor porfavor intenta mas tarde ")
      setTipoAlerta("error")
      setVisibleAlerta(true)
    } 
  }


  return (
    <div
      className="
    bg-blue-500
    flex flex-col items-center justify-center h-screen
    text-white
    "
    >
      <h1
        className="
      text-4xl font-bold mb-4
      "
      >
        Login
      </h1>
      <form
        onSubmit={manejarEnvio}
        className="
      bg-blue-600
        p-6 rounded shadow-md
        flex flex-col items-center
        gap-4

      "
      >
        <div
          className="
        flex flex-col gap-2
        "
        >
          <label
            className="
          text-white
          font-semibold
          "
            htmlFor="username"
          >
            Username:
          </label>
          <input
          onChange={manejarCambio}
            className="
          bg-white
            text-black
            px-4 py-2 rounded
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent

          "
            type="text"
            placeholder="Usuario"
            id="username"
            name="nombre_usuario"
            required
          />
        </div>
        <div
          className="
        flex flex-col gap-2

        "
        >
          <label
            className="
            text-white
            font-semibold
          "
            htmlFor="password"
          >
            Password:
          </label>
          <input
          onChange={manejarCambio}
            className="
            bg-white
                text-black
                px-4 py-2 rounded
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent
          "
            type="password"
            placeholder="Contraseña"
            id="password"
            name="contraseña"
            required
          />
        </div>
        <button
          className="
            bg-blue-700
            text-white
            px-4 py-2 rounded
            hover:bg-blue-800
            transition duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:ring-opacity-50
            focus:border-transparent
            hover:cursor-pointer

        "
          type="submit"
        >
          Login
        </button>
      </form>
      <div>
        <p className="text-white mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/registro" className="bg-blue-500 text-white px-4 py-2 rounded">
            Ir a registro
            </Link>
        </p>
      </div>
      <Alerta
      tipo={tipoAlerta}
      mensaje={error}
      visible={visibleAlerta}
      onClose={()=> setVisibleAlerta(false)}
      />
    </div>
  );
}

export default Login;
