//modelo de peticiones para la base de datos usuarios
//
// importar la conexión a la base de datos
// importar pool de la base de datos
import pool from "../db/db.js";


// crear la función todos que obtiene todos los usuarios de la base de datos
// y devuelve un array de objetos con los datos de cada usuario
// y maneja errores en caso de que ocurran
async function todos(){
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        return rows;
    }catch (error){
        console.error('ERROR: desde modelo.usuarios funcion todos()',error);
        throw new Error("Error al obtener los usuarios");
    }
}


// crear la función obtenerUsuario que obtiene un usuario por su id
// y devuelve un objeto con los datos del usuario
// y maneja errores en caso de que ocurran

async function uno(id){

    try{
        const [rows] = await pool.query(`SELECT * FROM usuarios WHERE id = ?`, [id])
        if(rows.length === 0){
            throw new Error(`No se encuentra el usuario con id ${id}`);
        }
        return rows[0];
    }catch(error){
        console.error(`ERROR : no se encontro el usuario con id ${id}`,error);
        throw new Error(`Error al obtener el usuario con id ${id}`);
    }
}

// crear funcion actulizar usuarios por id 
async function actualizar() {
    const { id } = req.params
    const { nombre_usuario , email , edad } = req.body
    if (!id){
        throw new Error('debes suministrar un id tipo numerico')
    }
    try {
        const [rows] = await pool.query(
            'UPDATE usuarios SET nombre_usuario= ? , email = ? , edad = ?   WHERE id = ?',
            [nombre_usuario, email, edad, id]);
        if(rows.length === 0){
            return res.status(404).json({error:' no se encuentra el usuario con el id suministrado'})
        }
        res.json({ id, nombre_usuario , email , edad })
    } catch (error) {
        console.error(`ERROR: no se pudo actualizar el usuario con el id ${id}`,error)
        res.status(500).json({ error: 'Error al actualizar el usuario'})
    }
}





// exportar la función para que pueda ser utilizada en otros archivos
 

export const modeloUsuarios= { todos, uno , actualizar };