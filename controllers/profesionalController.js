const Profesional = require("../models/Profesional")

exports.createProfesional = async (req, res) => {
    console.info('createProfesional')
    try {
        let profesional;
        console.info('profesional: ', req.body)
        console.info('imagen: ', req.file)
        const imagen = { ...req.body, imagen: req.file?.filename }
        console.info(imagen)
        profesional = new Profesional(imagen);
        await profesional.save();
        res.json(profesional)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getProfesional = async (req, res) => {
    console.info('getProfesional')
    try {
        const profesionales = await Profesional.find();
        res.status(200).json(profesionales);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getProfesionalesId = async (req, res) => {
    console.info('getProfesionalesId')
    console.info(req.params)
    try {
        let profesional = await Profesional.findById(req.params.id);
        if (!profesional) {
            res.status(404).json({ msg: 'No existe este profesional' })
        }
        res.json(profesional);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}