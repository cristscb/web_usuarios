import express from 'express'
import cors from 'cors'
import usuariosRouter from './routers/router.usuarios.js'


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// manejar rutas con router usuarios

app.use('/usuarios', usuariosRouter);

app.get('/back', (req, res) => {
  res.json({ titulo: 'Hello World! desde el back' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});