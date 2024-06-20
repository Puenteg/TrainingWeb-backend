const express = require("express");

const conectarDB = require("./config/db");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// Creamos el servidor
const app = express();
const multer = require("multer");
require("dotenv").config({ path: "variables.env" });

// Conectamos a la BD
conectarDB();
app.use(
  cors({
    origin: `${process.env.urlFrontEnd}`,
    credentials: true,
    allowedHeaders: ["Content-type", "access-control-allow-credentials"],
    exposedHeaders: ["Content-type", "access-control-allow-credentials"],
  })
);
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));

app.use(express.static("./public/images/"));

const storage = multer.diskStorage({
  filename: function (res, file, cb) {
    const ext = file.originalname.split(".").pop(); // png / jpeg / gif
    const fileName = file.originalname.substring(
      0,
      file.originalname.length - (ext.length + 1)
    );
    const postfijo = Date.now();
    cb(null, `${fileName}-${postfijo}.${ext}`); //TODO 123123213232.pdf
  },
  destination: function (res, file, cb) {
    cb(null, `./public/images`);
  },
});

const upload = multer({ storage });

// Prefilter
app.use("/", (req, res, next) => {
  console.info("*** PreFilter");
  const cookieUser = req.cookies?.SesionUserABC;
  console.info("Valida Ruta segura: ", req.url);
  if (req.url == "/api/usuario/logOut") {
    console.info("Borra cookie");
    const optionsCookie = {
      maxAge: 1000, // would expire after 1 second
      httpOnly: true, // The cookie only accessible by the web server
      //signed: true // Indicates if the cookie should be signed
    };
    res.cookie("SesionUserABC", `${cookieUser}`, optionsCookie);
    res.set("Access-Control-Allow-Credentials", "true");
    res.status(200).json({});
  } else if (
    req.url != "/api/empleados/" &&
    req.url != "/api/usuario/valida_credenciales" &&
    req.url != "/api/usuario/recupera_contrasena"
  ) {
    console.info("Validación de jwt", cookieUser);
    if (cookieUser) {
      next();
      const optionsCookie = {
        domain: `${process.env.urlFrontEnd}`,
        maxAge: 1000 * 60, // would expire after N Miliseconds
        httpOnly: true, // The cookie only accessible by the web server
        //signed: true // Indicates if the cookie should be signed
      };
      res.cookie("SesionUserABC", `${cookieUser}`, optionsCookie);
      res.set("Access-Control-Allow-Credentials", "true");
    } else {
      res.status(401).json({ message: "Lo sentimos su sesión ha caducado" });
    }
  } else {
    next();
  }
});

app.use("/api/recursos", require("./routes/recurso"));
app.use("/api/empleados", require("./routes/empleados"));
app.use("/api/empleado", require("./routes/empleado"));
app.use("/api/departamento", require("./routes/departamento"));
app.use("/api/dietas", upload.single("imagen"), require("./routes/dietas"));
app.use("/api/rutinas", upload.single("imagen"), require("./routes/rutinas"));
app.use("/api/profesionales", upload.single("imagen"), require("./routes/profesionales"));
app.use("/api/gama", require("./routes/gama"));

app.use("/api/marca", require("./routes/marca"));

app.use("/", require("./routes/empleado"));

app.use("/api/usuario", require("./routes/usuario"));

//app.use('/api/privilegio', require('./routes/privilegio'));
//app.use('/api/nombreRol', require('./routes/nombreRol'));

//app.get('/', (req, res) => {
// res.send('Hola Mundo')
//})

app.listen(4000, () => {
  console.log("El servidor esta corriendo perfectamente!");
});
