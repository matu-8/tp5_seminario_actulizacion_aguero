// ============================================================
// server.js - Configuración principal del servidor Express
// ============================================================

// Importamos express para crear el servidor
import express from "express";

// Importamos morgan para ver los logs de las peticiones en consola
import morgan from "morgan";

// Importamos los controladores de operaciones con matrices
import { controladorSuma, controladorProducto } from "./controladores.js";


// ============================================================
// CREACIÓN DE LA APLICACIÓN
// ============================================================

// Creamos la aplicación de Express
const app = express();

// Definimos el puerto donde va a escuchar el servidor
const PORT = 3000;


// ============================================================
// MIDDLEWARES
// ============================================================

// Morgan: muestra en consola cada petición que recibe el servidor
app.use(morgan("dev"));

// express.json(): permite que el servidor entienda el cuerpo
// de las peticiones que llegan en formato JSON
app.use(express.json());


// ============================================================
// RUTAS
// ============================================================

// Ruta GET en "/" para verificar que el servidor está funcionando
app.get("/", function (req, res) {
    res.send("Servidor de operaciones con matrices funcionando correctamente.");
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
