import { DataTypes } from 'sequelize';
import db from '../config/db.js';


const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING, //esto va a ser un varchar2
        allowNull: false //no va a ir vacio

    },
    email: {
        type: DataTypes.STRING, //esto va a ser un varchar2
        allowNull: false //no va a ir vacio
    },
    password: {
        type: DataTypes.STRING, //esto va a ser un varchar2
        allowNull: false //no va a ir vacio
    }
    ,
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function (usuario) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt)
        }
    }
}
);

export default Usuario