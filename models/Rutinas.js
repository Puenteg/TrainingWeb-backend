const mongoose = require("mongoose");

const RutinasSchema = mongoose.Schema({
    idRutnia: {
        type: Number,
        require: true
    },
    nombreRutnia: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    imagen: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Rutina', RutinasSchema)