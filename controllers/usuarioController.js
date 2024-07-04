import { check, validationResult } from 'express-validator';
import { emailOlvidePassword, emailRegistro } from '../helpers/emails.js';
import { generarId } from '../helpers/token.js';
import Usuario from '../models/Usuario.js';

const formularioLogin = (req, res) => {

    res.render('auth/login', {
        pagina: 'Iniciar sesion'
    });

}

const formularioRegistro = (req, res) => {

    res.render('auth/registro', {
        //informacion al objeto
        pagina: 'Crear Cuenta',
        crsfToken: req.crsfToken()//va a generar este token justo antes de renderizar la vista
    });

}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        //informacion al objeto
        pagina: 'Recupera tu acceso a Bienes raices',
        crsfToken: req.csrfToken()
    }), {
        //informacion al objeto
        pagina: 'Recupera tu acceso a Bienes raices'
    };

}
const resetPassword = async (req, res) => {
    //validacion
    await check('email').isEmail().withMessage("Eso no parece un email").run(req)

    console.log("hola")
    let resultado = validationResult(req)

    //verificar el resultado vacio
    if (!resultado.isEmpty()) {
        //hay errores
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a Bienes raices',
            crsfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }
    //hay que buscar al usuario
    const { email } = req.body;
    const { usuario } = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a BienesRaices',
            crsfToken: req.csrfToken(),
            errores: [{ msg: 'El email no pertence a ningun usuario' }]
        })
    }
    //generar un token y volver a enviar un email
    usuario.token = generarId();
    await usuario.save();

    //enviar un email
    emailOlvidePassword({
        email,
        nombre: usuario.nombre,
        token: usuario.token
    })

    //renderizar un mensaje


}
const registrar = async (req, res) => {

    //validacion
    await check('nombre').notEmpty().withMessage("Nombre obligatorio").run(req)
    await check('email').isEmail().withMessage("Eso no parece un email").run(req)
    await check('password').isLength({ min: 6, }).withMessage("La password debe ser de al menos 6 caracteres").run(req)
    await check('repetir_password').equals('password').withMessage("Los passwords no son iguales").run(req)
    //
    console.log("hola")
    let resultado = validationResult(req)

    //verificar el resultado vacio
    if (!resultado.isEmpty()) {
        //hay errores
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            crsfToken: req.csrfToken(),
            errores: resultado.array(),//lo convierte en arreglo para que luego lo podamos iterar en registro.pug
            //para que se queden los valores que habias puesto antes en el formulario
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    //extraer los datos
    const { nombre, email, password } = req.body
    //Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({ where: { email: email } })

    console.log(existeUsuario)

    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            csrfToken: req.crsfToken,
            errores: [{ msg: 'El usuario ya esta registrado' }],//creo un arreglo al vuelo
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })

    }
    //Almacenar un usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
        //cada usuario va a recibir un email con un enlace y cuando presionen en el tendran un token unico
        //vemos que usuario dio click y cambiamos su estado a validado
        //el tipico pulsa aqui para validar el correo
    })

    //Enviar email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })



    //mostrar mensaje de se creo tu usuario pero tienes que confimar el usuario
    //res.render renderizar la vista
    res.render('templates/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un email de confirmación, presiona en el enlace'
    })




}

const confirmar = async (req, res) => {
    console.log("confirmando ...")
    const { token } = req.params;
    //le estoy pasando el token
    console.log(token);

    const usuario = await Usuario.findOne({ where: { token } })

    console.log(usuario);

    if (!usuario) {
        //vista que ese usuario no es valido
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        })
    }


    //verificar si el token es valido
    //hay que eliminar token, para que solo se utilice una vez y lo ponemos a confirmado
    usuario.token = null //eliminar
    usuario.confirmado = true

    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta confirmada',
        mensaje: 'La cuenta se confirmó correctamente'
    })

}
const comprobarToken = (req, res) => {

}

const nuevoPassword = (req, res) => {

}

export {
    comprobarToken, confirmar, formularioLogin,
    formularioOlvidePassword,
    formularioRegistro, nuevoPassword, registrar, resetPassword
};

