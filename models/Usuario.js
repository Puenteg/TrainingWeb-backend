const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    idUsuario: {
        type: Number,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    contraseña: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: false
    },
    telefono: {
        type: String,
        require:false
    },
    email: {
        type: String,
        require:false
    },
    departamento: {
        type: String,
        require:false
    },    
    tipoUsuario: {
        type: String,
        requere: false
    },
    tipoProfesional: {
        type: String,
        requere: false
    },
    tituloProfesional: {
        type: String,
        requere: false
    },
    descripcionProfesional: {
        type: String,
        requre: false
    },
    estatus: {
        type: String,
        requre: false
    }
})

module.exports = mongoose.model('Usuario', UsuarioSchema);