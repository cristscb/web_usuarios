import React from "react";
import { useState} from "react";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";



function Registro() {
  const [usuario, setUsuario] = useState({
    nombre_usuario: "",
    email: "",
    edad: "",
    contraseña: "",
  });

  const [error,setError] = useState(null) // manejar errores
  const navigate= useNavigate() // inicializar hook 

    const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuario(({...usuario,[name]: value,}));
    };
  
    const manejarEnvio = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5000/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        });
        if (!response.ok) {
          throw new Error("Error al registrar el usuario");
        }
        const data = await response.json();
        console.log(data);

        navigate('/login')
      } catch (error) {
        setError(error);
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
        Registro
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
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold"htmlFor="nombre_usuario" >
            Nombre de usuario:
          </label>
          <input
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
            id="nombre_usuario"
            name="nombre_usuario"
            onChange={manejarCambio}
            value={usuario.nombre_usuario}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold"htmlFor="contraseña">
            Email:
          </label>
          <input
            className="
              bg-white
                  text-black
                  px-4 py-2 rounded
                  border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent
            "
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            onChange={manejarCambio}
            value={usuario.email}
            required
          />

          <label className="text-white font-semibold"htmlFor="edad">
            Edad:
          </label>
          <input
            className="
              bg-white
                  text-black
                  px-4 py-2 rounded
                  border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent
            "
            type="number"
            placeholder="Edad"
            id="edad"
            name="edad"
            onChange={manejarCambio}
            value={usuario.edad}
          
            required
          />

          <label className="text-white font-semibold"htmlFor="contraseña">
            Contraseña:
          </label>
          <input
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
            id="contraseña"
            name="contraseña"
            onChange={manejarCambio}
            value={usuario.contraseña}

            required
          />
        </div>
        <button
          type="submit"
          className=" 
              bg-blue-700
              text-white text-lg
              px-4 py-2 rounded
              hover:bg-blue-800
              transition duration-300 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:ring-opacity-50
              focus:border-transparent
              hover:cursor-pointer"
        >
          Registrarce
        </button>
      </form>
      <div>
            <p className="text-white mt-4">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
                Ir a login
                </Link>
            </p>
        </div>

        <button className="
        bg-blue-600
        hover:bg-blue-700 hover:cursor-pointer
        rounded-lg
        px-4 py-2
        text-2xl
        mt-5
        transition duration-200 ease-in-out
        ">
                <Link to='/'>Home</Link>
        </button>
    </div>
  );
}

export default Registro;
