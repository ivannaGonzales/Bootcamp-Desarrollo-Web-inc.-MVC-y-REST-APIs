import express from 'express';
import { comprobarToken, confirmar, formularioLogin, formularioOlvidePassword, formularioRegistro, nuevoPassword, registrar, resetPassword } from '../controllers/usuarioController.js';


const router = express.Router();

router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);
router.post('/auth/registro', registrar);
router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);

router.get('/confirmar/:token', confirmar);//cuenta como una variable
router.get('/olvide-password/:token', comprobarToken)//entonces cuando hagan click en el enlafe eso es un get que tendrá puesto el token
//enronces luego me encarfo de validar si el mismo token que tengo en base de datos
router.get('/olvide-password/:token', nuevoPassword)

export default router;

//crear endpoint

//=> pug la vista tambien react, vue
