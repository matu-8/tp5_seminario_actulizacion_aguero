// ============================================================
// server.js - Configuración principal del servidor Express
// ============================================================

// Importamos express para crear el servidor
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Importamos morgan para ver los logs de las peticiones en consola
import morgan from "morgan";

// Importamos los controladores de operaciones con matrices
import { controladorSuma, controladorProducto } from "./controladores.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================
// CREACIÓN DE LA APLICACIÓN
// ============================================================

// Creamos la aplicación de Express
const app = express();

// Definimos el puerto donde va a escuchar el servidor
const PORT = 3000;

// MIDDLEWARES
// Morgan: muestra en consola cada petición que recibe el servidor
app.use(morgan("dev"));

// express.json(): permite que el servidor entienda el cuerpo
// de las peticiones que llegan en formato JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Ruta GET en "/" para enviar la interfaz HTML
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta POST en "/suma"
// Espera recibir en el cuerpo: { "matrizA": [...], "matrizB": [...] }
// El controlador se encarga de validar y calcular la suma
app.post("/suma", controladorSuma);

// Ruta POST en "/producto"
// Espera recibir en el cuerpo: { "matrizA": [...], "matrizB": [...] }
// El controlador se encarga de validar y calcular el producto
app.post("/producto", controladorProducto);


// ============================================================
// INICIO DEL SERVIDOR
// ============================================================

app.listen(PORT, function () {
    console.log("Servidor iniciado en http://localhost:" + PORT);
});
