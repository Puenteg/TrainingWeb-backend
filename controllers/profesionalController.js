const Profesional = require("../models/Profesional")
const Usuario = require ("../models/Empleado")
const { transporter } = require("./../nodemailer");

exports.createProfesional = async (req, res) => {
    console.info('createProfesional')
    try {
        let profesional;
        console.info('profesional: ', req.body)
        console.info('imagen: ', req.file)
        const imagen = { ...req.body, imagen: req.file?.filename, estatus: 'inactivo' }
        imagen.contraseña = req.body['contraseÃ±a']
        console.info(imagen)
        profesional = new Usuario(imagen);

        // Valida la NO existencia del usuario a Crear
        let usuarioExistente = await Usuario.find({usuario: profesional.usuario});
        if(usuarioExistente.length > 0) {
            console.info(usuarioExistente);
            return res.status(400).send({message: 'El nombre de usuario que intenta registrar ya ha sido creado. Intente con otro'})
        }
        usuarioExistente = await Usuario.find({email: profesional.email});
        if(usuarioExistente.length > 0) {
            console.info(usuarioExistente);
            return res.status(400).send({message: 'El correo electronico que intenta registrar ya ha sido creado. Intente con otro'})
        }

        const newProfesional = await profesional.save();

        enviaCorreo(newProfesional)
        ////

        res.json(profesional)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

async function enviaCorreo(newUsuario) {
    const mailOptions = {
        from: 'cesarcruz61717@gmail.com',
        to: newUsuario.email,
        subject: 'Confirmación de registro',
        html: `Bienvenido ${newUsuario.usuario}
        Hemos recibido la petición de unirte a Training Web, para confirmar el registro da clic en el siguiente enlace:
        <a href="${process.env.urlBackEnd}/api/usuario/verificar?_id=${newUsuario._id}">Activar Cuenta</a>
        Si no has solicitado este correo, puedes ignorarlo`,
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
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

exports.getProfesionales = async (req, res) => {
    console.info('getProfesional')
    try {
        const profesionales = await Usuario.find({estatus: 'activo', roles: { $in: ['entrenador', 'nutriologo'] }});
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