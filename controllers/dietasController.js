const Dieta = require("../models/Dietas");

exports.createDieta = async (req, res) => {
    console.info('createDieta')
    try{
        let dieta;
        console.info('dieta: ', req.body)
        console.info('imagen: ', req.file)
        const imagen = {...req.body, imagen: req.file?.filename}
        console.info(imagen)
        dieta = new Dieta(imagen);
        await dieta.save();
        res.json(dieta)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteDietaById = async (req, res) => {
    console.info('deleteDietaById::', req.params.id)
    const dieta = await Dieta.findByIdAndDelete(req.params.id);
    if (!dieta) {
        res.status(404).json({ msg: 'No existe esta dieta' })
    } else {
        res.json(dieta);
    }

}

exports.getDietas = async (req, res) =>{
    console.info('getDieta')
    try{
        const dietas = await Dieta.find();
        res.status(200).json(dietas);
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getDietaId = async (req, res) => {
    console.info('getDietaId')
    console.info(req.params)
    try {
        let dieta = await Dieta.findById(req.params.id);
        if (!dieta) {
            res.status(404).json({ msg: 'No existe esta dieta' })
        }
        res.json(dieta);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}