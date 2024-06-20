const mongoose = require('mongoose');

const DietaSchema = mongoose.Schema({
    idDieta: {
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
    autor: {
        type: String,
        require: true
    },
    contribucion: {
        type: String,
        require: true
    },
    lunesDesayuno: {
        type: String,
        require: true
    },
    lunesComida: {
        type: String,
        require: true
    },
    lunesCena: {
        type: String,
        require: true
    },
    martesDesayuno: {
        type: String,
        require: true
    },
    martesComida: {
        type: String,
        require: true
    },
    martesCena: {
        type: String,
        require: true
    },
    miercolesDesayuno: {
        type: String,
        require: true
    },
    miercolesComida: {
        type: String,
        require: true
    },
    miercolesCena: {
        type: String,
        require: true
    },
    juevesDesayuno: {
        type: String,
        require: true
    },
    juevesComida: {
        type: String,
        require: true
    },
    juevesCena: {
        type: String,
        require: true
    },
    viernesDesayuno: {
        type: String,
        require: true
    },
    viernesComida: {
        type: String,
        require: true
    },
    viernesCena: {
        type: String,
        require: true
    },
    sabadoDesayuno: {
        type: String,
        require: true
    },
    sabadoComida: {
        type: String,
        require: true
    },
    sabadoCena: {
        type: String,
        require: true
    },
    domingoDesayuno: {
        type: String,
        require: true
    },
    domingoComida: {
        type: String,
        require: true
    },
    domingoCena: {
        type: String,
        require: true
    },
    imagen: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Dieta', DietaSchema);