const mongoose = require("mongoose");

const RutinasSchema = mongoose.Schema({
    idRutnia: {
        type: Number,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    lunes: {
        type: String,
        require: true
    },
    martes: {
        type: String,
        require: true
    },
    miercoles: {
        type: String,
        require: true
    },
    jueves: {
        type: String,
        require: true
    },
    viernes: {
        type: String,
        require: true
    },
    sabado: {
        type: String,
        require: true
    },
    domingo: {
        type: String,
        require: true
    },
    imagen: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Rutina', RutinasSchema)