const Rutina = require("../models/Rutinas");

exports.createRutina = async (req, res) => {
    console.info('createRutina')
    try {
        let rutina;
        console.info('rutina: ', req.body)
        console.info('imagen: ', req.file)
        const imagen = { ...req.body, imagen: req.file?.filename }
        console.info(imagen)
        rutina = new Rutina(imagen);
        await rutina.save();
        res.json(rutina)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

/* exports.deleteDietaById = async (req, res) => {
    console.info('deleteDietaById::', req.params.id)
    const dieta = await Dieta.findByIdAndDelete(req.params.id);
    if (!dieta) {
        res.status(404).json({ msg: 'No existe esta dieta' })
    } else {
        res.json(dieta);
    }
} */

exports.getRutina = async (req, res) => {
    console.info('getRutina')
    try {
        const rutinas = await Rutina.find();
        res.status(200).json(rutinas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getRutinaId = async (req, res) => {
    console.info('getRutinaId')
    console.info(req.params)
    try {
        let rutina = await Rutina.findById(req.params.id);
        if (!rutina) {
            res.status(404).json({ msg: 'Esta Rutina no existe!' })
        }
        res.json(rutina);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteById = async (req, res) => {
    console.info('deleteRutinaById::', req.params.id)
    const dieta = await Rutina.findByIdAndDelete(req.params.id);
    if (!dieta) {
        res.status(404).json({ msg: 'No existe esta dieta' })
    } else {
        res.json(dieta);
    }
}