// ============================================================
// operaciones.js - Lógica de operaciones matemáticas con matrices
//
// A diferencia del cliente (matrices.js), estas funciones NO
// interactúan con el DOM. Reciben las matrices como parámetros
// (arrays de JavaScript) y retornan el resultado calculado.
// ============================================================


// ============================================================
// FUNCIÓN: sumarMatrices
//
// Recibe dos matrices (arrays 2D) y retorna su suma.
// Cada posición del resultado = A[f][c] + B[f][c]
//
// Parámetros:
//   matrizA → array 2D (ej: [[1,2],[3,4]])
//   matrizB → array 2D (ej: [[5,6],[7,8]])
//
// Retorna:
//   Un array 2D con los valores sumados celda por celda.
// ============================================================

function sumarMatrices(matrizA, matrizB) {

    // Obtener las dimensiones de cada matriz
    const filasA    = matrizA.length;
    const columnasA = matrizA[0].length;

    // Array donde vamos a guardar los resultados
    const resultado = [];

    // Recorrer fila por fila
    for (let f = 0; f < filasA; f++) {

        // Crear una fila vacía para el resultado
        const filaResultado = [];

        // Recorrer columna por columna dentro de la fila actual
        for (let c = 0; c < columnasA; c++) {

            // Sumar el elemento en la misma posición de ambas matrices
            const valorSumado = matrizA[f][c] + matrizB[f][c];

            // Agregar el valor calculado a la fila del resultado
            filaResultado.push(valorSumado);
        }

        // Agregar la fila completa al resultado final
        resultado.push(filaResultado);
    }

    return resultado;
}


// ============================================================
// FUNCIÓN: multiplicarMatrices
//
// Recibe dos matrices (arrays 2D) y retorna su producto.
// Algoritmo: triple bucle anidado.
//
// Parámetros:
//   matrizA → array 2D
//   matrizB → array 2D
//
// Retorna:
//   Un array 2D con el resultado de la multiplicación.
//   Sus dimensiones son: filas(A) x columnas(B)
// ============================================================

function multiplicarMatrices(matrizA, matrizB) {

    // Obtener las dimensiones necesarias para el algoritmo
    const filasA    = matrizA.length;
    const columnasA = matrizA[0].length;
    const columnasB = matrizB[0].length;

    // Paso 1: inicializar la matriz resultado con ceros
    // Su tamaño es: filas de A × columnas de B
    const resultado = [];

    for (let f = 0; f < filasA; f++) {
        const filaVacia = [];

        for (let c = 0; c < columnasB; c++) {
            filaVacia.push(0);
        }

        resultado.push(filaVacia);
    }

    // Paso 2: aplicar el algoritmo de multiplicación con triple bucle
    //
    // f → recorre las filas del resultado (y de matrizA)
    // c → recorre las columnas del resultado (y de matrizB)
    // k → recorre los elementos que se multiplican y acumulan
    //
    // Fórmula: resultado[f][c] += matrizA[f][k] * matrizB[k][c]

    for (let f = 0; f < filasA; f++) {
        for (let c = 0; c < columnasB; c++) {
            for (let k = 0; k < columnasA; k++) {
                resultado[f][c] = resultado[f][c] + (matrizA[f][k] * matrizB[k][c]);
            }
        }
    }

    return resultado;
}


// ============================================================
// EXPORTACIONES
//
// Exportamos las funciones para que puedan ser importadas
// desde otros archivos del proyecto (como los controladores).
// ============================================================

export { sumarMatrices, multiplicarMatrices };
