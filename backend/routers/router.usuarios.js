// router usuarios.js
import express from "express";

import dayjs from "dayjs"; // Instálalo con: npm i dayjs
// import { pool } from "../db/db.js";
import pool from "../db/db.js";
const router = express.Router();
// importar modelo de usuarios
import {modeloUsuarios} from "../models/modelo.usuarios.js";

// Obtener todos los usuarios desde el modelo
router.get("/todos", async (req, res) => {
  try {
    const usuarios = await modeloUsuarios.todos();
    const usuariosFormateados= usuarios.reduce((acumulador,info,index)=>{
     acumulador[`usuario ${index + 1 }`]={
      id: info.id,
      nombre: info.nombre_usuario,
      email: info.email,
      contraseña: info.contraseña
     };
     return acumulador 
    },{})
    
    // res.send(JSON.stringify(usuarios));
     res.json(usuariosFormateados);
    // res.send(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios desde el modelo usuarios" });
  }
});
//
// Obtener un usuario por ID

router.get('/uno/:id', async (req ,res )=>{
  const {id} = req.params;
  try{
     const usuarioID = await modeloUsuarios.uno(id);
    //  res.send(usuarioID);
     res.status(200).json({
      message: 'todo ok',
      usuario: usuarioID
     })
    // res.send(JSON.stringify(usuarioID));
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Error al obtener el usuario desde el modelo usuarios"});  
  }
})

// Actualizar usuarios por id 

router.put('/put/:id', async (req , res )=>{
  const { id } = req.params
  try {
    const usuarioID = await modeloUsuarios.actualizar(id);
    res.json(usuarioID)
  } catch (error) {
    console.log( error );
    res.status(500).json({error: 'error al elimiar usuario'})
  }
})

  // Crear un nuevo usuario
  router.post("/", async (req, res) => {
    const { nombre_usuario, email,edad, contraseña } = req.body;

    try {
      const [result] = await pool.query(
        "INSERT INTO usuarios (nombre_usuario, email, edad, contraseña) VALUES (?, ?, ?, ?)",
        [nombre_usuario, email, edad, contraseña]
      );
      res.status(201).json({ id: result.insertId, nombre_usuario, email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el usuario" });
    }
  });
// Actualizar un usuario


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?",
      [nombre, email, password, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ id, nombre, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
} );
// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});


// ruta para login 
// router.post("/login", async (req, res) => {
//   const { nombre_usuario, contraseña } = req.body;
//   try {
//     const [rows] = await pool.query(
//       "SELECT id, nombre_usuario, email, edad FROM usuarios WHERE nombre_usuario = ? AND contraseña = ?",
//       [nombre_usuario, contraseña]
//     );

//     if (rows.length === 0) {
//       return res.status(401).json({ error: "Credenciales inválidas" });
//     }

//     res.json(rows[0]); // Devuelve los datos del usuario sin contraseña
//   } catch (error) {
//     console.error("Error al autenticar usuario", error);
//     res.status(500).json({ error: "Error del servidor" });
//   }
// });





router.post("/login", async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  try {
    // Verifica si el usuario existe
    const [usuarios] = await pool.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = ?",
      [nombre_usuario]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ error: "Usuario no registrado" });
    }

    const usuario = usuarios[0];

    // Verificar si el usuario está bloqueado
    if (usuario.bloqueado_hasta && new Date(usuario.bloqueado_hasta) > new Date()) {
      return res.status(403).json({
        error: "Cuenta bloqueada por múltiples intentos fallidos. Intente más tarde.",
      });
    }

    // Validar contraseña
    if (usuario.contraseña !== contraseña) {
      const nuevosIntentos = usuario.intentos_fallidos + 1;

      let queryUpdate;
      let mensaje;

      if (nuevosIntentos >= 3) {
        const bloqueoTemporal = dayjs().add(5, 'minute').format("YYYY-MM-DD HH:mm:ss");

        queryUpdate = pool.query(
          "UPDATE usuarios SET intentos_fallidos = ?, bloqueado_hasta = ? WHERE id = ?",
          [nuevosIntentos, bloqueoTemporal, usuario.id]
        );

        mensaje = "Cuenta bloqueada por múltiples intentos fallidos. Intente más tarde.";
      } else {
        queryUpdate = pool.query(
          "UPDATE usuarios SET intentos_fallidos = ? WHERE id = ?",
          [nuevosIntentos, usuario.id]
        );

        mensaje = "Contraseña incorrecta";
      }

      await queryUpdate;
      return res.status(401).json({ error: mensaje });
    }

    // Si las credenciales son correctas, reiniciar los intentos fallidos
    await pool.query(
      "UPDATE usuarios SET intentos_fallidos = 0, bloqueado_hasta = NULL WHERE id = ?",
      [usuario.id]
    );

    // Puedes devolver solo datos necesarios
    const usuarioAutenticado = {
      id: usuario.id,
      nombre_usuario: usuario.nombre_usuario,
      email: usuario.email,
    };

    res.json(usuarioAutenticado);

  } catch (error) {
    console.error("Error al autenticar usuario", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});


// Exportar el router
export default  router; 