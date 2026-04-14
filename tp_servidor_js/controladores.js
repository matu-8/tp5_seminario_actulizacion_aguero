// ============================================================
// controladores.js - Validaciones y manejo de peticiones
//
// Cada controlador es una función que recibe la petición (req)
// y la respuesta (res) de Express.
//
// Responsabilidades de cada controlador:
//   1. Leer los datos que llegaron en el cuerpo de la petición
//   2. Validar que esos datos sean correctos
//   3. Llamar a la función de operaciones correspondiente
//   4. Enviar la respuesta al cliente en formato JSON
// ============================================================

// Importamos las funciones de operaciones matemáticas
import { sumarMatrices, multiplicarMatrices } from "./operaciones.js";


// ============================================================
// FUNCIÓN AUXILIAR: validarQueSeaNumero
//
// Recorre todos los elementos de una matriz (array 2D) y
// verifica que cada uno sea un número válido.
//
// Parámetros:
//   matriz → array 2D a validar
//
// Retorna:
//   true  → si todos los elementos son números válidos
//   false → si algún elemento NO es un número
// ============================================================

function validarQueSeaNumero(matriz) {

    // Recorremos cada fila de la matriz
    for (let f = 0; f < matriz.length; f++) {

        // Recorremos cada elemento dentro de la fila
        for (let c = 0; c < matriz[f].length; c++) {

            // Guardamos el elemento actual en una variable para leerlo mejor
            const elemento = matriz[f][c];

            // typeof comprueba el tipo de dato del elemento
            // Si NO es de tipo "number", retornamos false
            if (typeof elemento !== "number") {
                return false;
            }

            // isNaN comprueba si el valor es NaN (Not a Number)
            // Aunque typeof diga "number", NaN sigue siendo inválido
            if (isNaN(elemento)) {
                return false;
            }
        }
    }

    // Si pasó todos los controles, todos los elementos son válidos
    return true;
}


// ============================================================
// CONTROLADOR: controladorSuma
//
// Maneja las peticiones POST a la ruta /suma.
// Aplica las siguientes validaciones:
//   a) Todos los valores deben ser números
//   b) Las dos matrices deben tener las mismas dimensiones
// ============================================================

function controladorSuma(req, res) {

    // Leemos las dos matrices que llegaron en el cuerpo de la petición
    const matrizA = req.body.matrizA;
    const matrizB = req.body.matrizB;

    // --- VALIDACIÓN: verificar que ambas matrices fueron enviadas ---
    if (matrizA === undefined || matrizB === undefined) {
        res.status(400).json({
            error: "Faltan datos. Se deben enviar 'matrizA' y 'matrizB'."
        });
        return;
    }

    // --- VALIDACIÓN a): los valores deben ser solo números ---
    const matrizATieneNumeros = validarQueSeaNumero(matrizA);
    const matrizBTieneNumeros = validarQueSeaNumero(matrizB);

    if (matrizATieneNumeros === false) {
        res.status(400).json({
            error: "La Matriz A contiene valores que no son números."
        });
        return;
    }

    if (matrizBTieneNumeros === false) {
        res.status(400).json({
            error: "La Matriz B contiene valores que no son números."
        });
        return;
    }

    // --- VALIDACIÓN b): las dimensiones deben ser iguales para poder sumar ---

    // Obtenemos las dimensiones de cada matriz
    const filasA    = matrizA.length;
    const columnasA = matrizA[0].length;
    const filasB    = matrizB.length;
    const columnasB = matrizB[0].length;

    // Comparamos filas
    if (filasA !== filasB) {
        res.status(400).json({
            error: "No se puede sumar: la cantidad de filas es distinta. " +
                   "Matriz A tiene " + filasA + " filas y Matriz B tiene " + filasB + " filas."
        });
        return;
    }

    // Comparamos columnas
    if (columnasA !== columnasB) {
        res.status(400).json({
            error: "No se puede sumar: la cantidad de columnas es distinta. " +
                   "Matriz A tiene " + columnasA + " columnas y Matriz B tiene " + columnasB + " columnas."
        });
        return;
    }

    // --- OPERACIÓN: todas las validaciones pasaron, calculamos la suma ---
    const resultado = sumarMatrices(matrizA, matrizB);

    // Enviamos el resultado al cliente en formato JSON con estado 200 (OK)
    res.status(200).json({
        operacion: "suma",
        resultado: resultado
    });
}


// ============================================================
// CONTROLADOR: controladorProducto
//
// Maneja las peticiones POST a la ruta /producto.
// Aplica las siguientes validaciones:
//   a) Todos los valores deben ser números
//   c) Las columnas de A deben coincidir con las filas de B
// ============================================================

function controladorProducto(req, res) {

    // Leemos las dos matrices que llegaron en el cuerpo de la petición
    const matrizA = req.body.matrizA;
    const matrizB = req.body.matrizB;

    // --- VALIDACIÓN: verificar que ambas matrices fueron enviadas ---
    if (matrizA === undefined || matrizB === undefined) {
        res.status(400).json({
            error: "Faltan datos. Se deben enviar 'matrizA' y 'matrizB'."
        });
        return;
    }

    // --- VALIDACIÓN a): los valores deben ser solo números ---
    const matrizATieneNumeros = validarQueSeaNumero(matrizA);
    const matrizBTieneNumeros = validarQueSeaNumero(matrizB);

    if (matrizATieneNumeros === false) {
        res.status(400).json({
            error: "La Matriz A contiene valores que no son números."
        });
        return;
    }

    if (matrizBTieneNumeros === false) {
        res.status(400).json({
            error: "La Matriz B contiene valores que no son números."
        });
        return;
    }

    // --- VALIDACIÓN c): columnas de A deben coincidir con filas de B ---

    const columnasA = matrizA[0].length;
    const filasB    = matrizB.length;

    if (columnasA !== filasB) {
        res.status(400).json({
            error: "No se puede multiplicar: la cantidad de columnas de Matriz A (" + columnasA + ") " +
                   "debe ser igual a la cantidad de filas de Matriz B (" + filasB + ")."
        });
        return;
    }

    // --- OPERACIÓN: todas las validaciones pasaron, calculamos el producto ---
    const resultado = multiplicarMatrices(matrizA, matrizB);

    // Enviamos el resultado al cliente en formato JSON con estado 200 (OK)
    res.status(200).json({
        operacion: "producto",
        resultado: resultado
    });
}


// ============================================================
// EXPORTACIONES
// ============================================================

export { controladorSuma, controladorProducto };
