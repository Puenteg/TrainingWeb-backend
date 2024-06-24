const Empleado = require ("../models/Empleado");
const { transporter } = require('../nodemailer'); // Ajusta la ruta según tu estructura de carpetas

exports.crearEmpleado = async (req, res) => {
    console.info('crearEmpleado')
    try{
        let empleado;
        //crear empleado
        empleado = new Empleado({...req.body, estatus: 'inactivo' });
        // Valida la NO existencia del usuario a Crear
        let usuarioExistente = await Empleado.find({usuario: empleado.usuario});
        if(usuarioExistente.length > 0) {
            console.info(usuarioExistente);
            return res.status(400).send({message: 'El nombre de usuario que intenta registrar ya ha sido creado. Intente con otro'})
        }
        usuarioExistente = await Empleado.find({email: empleado.email});
        if(usuarioExistente.length > 0) {
            console.info(usuarioExistente);
            return res.status(400).send({message: 'El correo electronico que intenta registrar ya ha sido creado. Intente con otro'})
        }

        const newEmpleado = await empleado.save();
        const mailOptions = {
            from: 'cesarcruz61717@gmail.com',
            to: empleado.email,
            subject: 'Confirmación de registro',
            html: `Bienvenido ${empleado.usuario}
            Hemos recibido la petición de unirte a Training Web, para confirmar el registro da clic en el siguiente enlace:
            <a href="${process.env.urlBackEnd}/api/usuario/verificar?_id=${newEmpleado._id}">Activar Cuenta</a>
            Si no has solicitado este correo, puedes ignorarlo`,
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.send(empleado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerEmpleados = async (req, res) =>{
    console.info('obtenerEmpleados')

    try{
        const empleados = await Empleado.find();
        res.json(empleados);
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarEmpleado = async (req, res) =>{
    console.info('actualizarEmpleado')

    try{
        console.info('id: ' + req.params.id)
        const { nombre, aPaterno, aMaterno, rfc, telefono, email, departamento, supervisor, puesto } = req.body;
        let empleado = await Empleado.findById(req.params.id);
        console.info(empleado)
        if(!empleado){
            res.status(404).json({msg: 'No existe este empleado'})
            
        }
        empleado.nombre = nombre;
        empleado.aPaterno = aPaterno;
        empleado.aMaterno = aMaterno;            
            empleado.rfc = rfc;
            empleado.telefono = telefono;
            empleado.email = email;
            empleado.departamento = departamento;
            empleado.supervisor = supervisor;
            empleado.puesto = puesto;

            empleado = await Empleado.findOneAndUpdate({_id: req.params.id}, empleado, { new: true })
            res.json(empleado);
        }
        catch (error){
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    }


    exports.obtenerEmpleado = async (req, res) =>{
        console.info('obtenerEmpleado')
        console.info(req.params)
        try{
                let empleado = await Empleado.findById(req.params.id);
                if(!empleado){
                    res.status(404).json({msg: 'No existe este empleado'})
    
                }
               
                res.json(empleado);
            }
            catch (error){
                console.log(error);
                res.status(500).send('Hubo un error');
            }
        }
    
        
     
    exports.eliminarEmpleado = async (req, res) =>{
        console.info('eliminarEmpleado')

        try {
            let empleado = await Empleado.findById(req.params.id);
    
            if(!empleado) {
                res.status(404).json({ msg: 'No existe el empleado' })
            }
           
            await Empleado.findOneAndDelete({ _id: req.params.id })
            res.json({ msg: 'Empleado eliminado con exito' });
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
        }

