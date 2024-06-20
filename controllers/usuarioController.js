const Usuario = require("../models/Empleado");
const { transporter } = require("./../nodemailer");

exports.createUsuario = async (req, res) => {
  try {
    let newUsuario;

    //Creamos Usuario
    usuario = new Usuario(req.body);
    await newUsuario.save();
    res.send(newUsuario);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

exports.validaCredenciales = async (req, res) => {
  console.info("::validaCredenciales");
  try {
    const filters = { nombre: req.body.username, contraseña: req.body.pwd };
    console.info("body: ", req.body);
    console.info("filtros: ", filters);
    const usuarios = await Usuario.find(filters);
    if (usuarios.length === 1) {
      const optionsCookie = {
        // domain: `${process.env.urlFrontEnd}`,
        maxAge: 1000 * 60, // would expire after N Miliseconds
        httpOnly: false, // The cookie only accessible by the web server
        //signed: true // Indicates if the cookie should be signed
      };
      res.cookie("SesionUserABC", `${usuarios[0].nombre}`, optionsCookie);
      res.set("Access-Control-Allow-Credentials", "true");

      const codigoVerificador = generaCodigoVerificador();
      enviaEmailCodVerificador(
        usuarios[0].email,
        usuarios[0].nombre,
        codigoVerificador
      );
      res.json({ usuario: usuarios[0], codVerificador: codigoVerificador });
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

exports.recuperaContrasena = async (req, res) => {
  console.info("::recuperaContraseña");
  const correo = req.body.correo;
  try {
    console.info("Busqueda de usuario con correo ", correo);
    const usuarios = await Usuario.find({ email: correo });
    console.info(usuarios);
    if (usuarios.length === 1) {
      const usuario = usuarios[0];
      const contrasena = generaContraseña();
      // TODO: envia contraseña por correo

      enviaEmail(usuario.email, usuario.nombre, contrasena);

      console.info(contrasena);
      usuario.contraseña = contrasena;
      await Usuario.findOneAndUpdate(usuario._id, usuario);

      res
        .status(200)
        .send({
          message: `Se ha generado una nueva contraseña. Revise su correo para consultar la nueva contraseña`,
        });
    } else {
      throw "Error";
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message: `No se puede recuperar la contraseña del correo ${correo}`,
      });
  }
};

function generaCodigoVerificador() {
  let codigoVerificador = "";
  for (let i = 0; i < 4; i++) {
    const numero = Math.round(Math.random() * 9);
    codigoVerificador += numero;
  }
  return codigoVerificador;
}

function generaContraseña() {
  const letras = "abcdefghijklmnñopqrstuvwxyz";
  const simbolos = "!$%&/()=?^_-:;@*|#{[]}";

  let pwd = "";

  for (let i = 0; i < 8; i++) {
    const isLetra = Math.random() < 0.8;
    if (isLetra) {
      let numLetra = Math.round(Math.random() * 26);
      const isMayuscula = Math.random() < 0.45;
      let letra = letras[numLetra];
      if (isMayuscula) {
        letra = letra.toUpperCase();
      }
      pwd += letra;
    } else {
      const numSymbol = Math.round(Math.random() * 21);
      pwd += simbolos[numSymbol];
    }
  }
  return pwd;
}

async function enviaEmail(email, usuario, password) {
  const mailOptions = {
    from: "cesarcruz61717@gmail.com",
    to: email,
    subject: "Recuperación de contraseña",
    text: `Estimado usuario,

Ha solicitado el restablecimiento de su contraseña para poder volver a acceder a su cuenta de Training Web vinculada a su correo ${email}, a continuación te proporcionamos sus datos de acceso con su contraseña temporal.

Usuario: ${usuario}
Contraseña: ${password}





No respondas este correo electrónico. Los correos electrónicos enviados a esta dirección no se responderán.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.log(`Error al enviar correo a ${email}: ${error}`);
  }
}

async function enviaEmailCodVerificador(email, usuario, codigoVerificador) {
  const mailOptions = {
    from: "cesarcruz61717@gmail.com",
    to: email,
    subject: "Confirma tu correo electrónico",
    text: `Estimado usuario

Confirma tu correo electrónico ${email}

Usuario: ${usuario}

Tu código de verificación es: ${codigoVerificador}



Recibiste esta notificación por inicio de sesión en Trining Web. Si tú no has intentado ingresar y estos no son tus datos, por favor haz caso omiso a este correo electrónico.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.log(`Error al enviar correo a ${email}: ${error}`);
  }
}
