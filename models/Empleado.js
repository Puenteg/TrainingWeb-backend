const mongoose = require('mongoose');

const EmpleadoEsquema = mongoose.Schema({
    idEmpleado: {
        type: Number,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    contraseña: {
        type: String,
        require: true
    },
    apellidos: {
        type: String,
        require: true
    },
    telefono: {
        type: String,
        require:false
    },
    email: {
        type: String,
        require:false
    },
    estatus: {
        type: String,
        require:false
    },
    roles: [{
        type: String,
        require: false
    }],
    descripcionCorta: {
        type: String,
        require:false
    },
    descripcion: {
        type: String,
        require:false
    },
    imagen: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Empleado', EmpleadoEsquema);