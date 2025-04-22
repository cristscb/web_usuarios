    import mysql2 from 'mysql2/promise';



    const pool = mysql2.createPool({
    host: 'localhost',
    user:'root',
    password:'',
    database:'prueba'
    });

    // exportar la conexión para que pueda ser utilizada en otros archivos
    export default  pool;