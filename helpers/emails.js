import nodemailer from 'nodemailer';
const emailRegistro = async (datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, nombre, token } = datos
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta bb',
        text: 'Confirma tu cuenta majo',
        html: `
        <p> Hola ${nombre}, comprueba tu cuenta en BienesRaices.com </p>
        <p>Tu cuenta ya esta lista, solo debes confirmarla en la siguiente enlace:
        <a href="${process.env.BACKEND_URL}:${process.env.port ?? 3000} / auth / confirmar / ${token}"> Confirmar 
        cuenta </a> </p>
    < p > Si tu no creaste esta cuenta, ignarolo</p >
        `
    })

}

const emailOlvidePassword = async (datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, nombre, token } = datos
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Reestablece tu password en BienesRaices',
        text: 'Confirma tu cuenta majo',
        html: `
        <p> Hola ${nombre}, has solicitado reestablecer tu password en BienesRaices.com </p>

        <p>Sigue el siguiente enlace para generar un password nuevo </p>
        <p>Tu cuenta ya esta lista, solo debes confirmarla en la siguiente enlace:
        <a href="${process.env.BACKEND_URL}:${process.env.port ?? 3000} / auth / olvide-password / ${token}"> Reestablcer password 
        cuenta </a> </p>
    < p > Si tu no solicitaste el cambio de password, ignarolo</p >
        `
    })

}
export {
    emailOlvidePassword, emailRegistro
};

