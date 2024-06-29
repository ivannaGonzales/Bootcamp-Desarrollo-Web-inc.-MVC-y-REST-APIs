

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar sesion'
    });

}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        //informacion al objeto
        pagina: 'Crear Cuenta'
    });

}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        //informacion al objeto
        pagina: 'Recupera tu acceso a Bienes raices'
    }), {
        //informacion al objeto
        pagina: 'Recupera tu acceso a Bienes raices'
    };

}

export {
    formularioLogin, formularioOlvidePassword, formularioRegistro
};

