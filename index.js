
import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

app.set('view engine', 'pug')
app.set('views', './views')

//carpeta publica
//carpeta que identidica los archivos estaticos
app.use(express.static('public'))

//
app.use("/auth", usuarioRoutes);

const port = 3000;

app.listen(port, () => {
    console.log('El servidor esta funcionando en el puerto ${port}')
})