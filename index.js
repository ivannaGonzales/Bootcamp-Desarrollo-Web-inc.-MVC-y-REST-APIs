
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import express from 'express';
import db from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

//habiliatr lectura de datos de formularios
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

// habilitar crsf
app.use(csrf({ cookie: true }))
try {
    await db.authenticate(); // Espera a que la autenticación se complete
    await db.sync(); // Espera a que la sincronización se complete
    console.log('Conexión directa a la base de datos');
} catch (error) {
    console.error("Error al conectar con la base de datos:", error);
}

app.set('view engine', 'pug')
app.set('views', './views')

//carpeta publica
//carpeta que identidica los archivos estaticos
app.use(express.static('public'))

//
app.use("/auth", usuarioRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('El servidor esta funcionando en el puerto ${port}')
})