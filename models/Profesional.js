const mongoose = require('mongoose');

const ProfesionalSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    imagen: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Profesional', ProfesionalSchema);