// ============================================================
// TRABAJO PRÁCTICO 5 - Operaciones con Matrices
// Lógica modularizada en JavaScript puro
// ============================================================

// Variable global que guarda cuántas matrices hay
// → let: se reasigna dentro de generarFormularioDimensiones()
let cantidadMatrices = 0;


// FASE 1 - Generar formulario para ingresar filas y columnas

function generarFormularioDimensiones() {
    // Leer la cantidad de matrices del input
    cantidadMatrices = parseInt(document.getElementById("cantidadMatrices").value);

    // Validar que sea un número válido
    if (isNaN(cantidadMatrices) || cantidadMatrices < 2) {
        alert("Por favor ingrese al menos 2 matrices.");
        return;
    }

    // Obtener el div donde vamos a mostrar los campos
    // → const: la referencia al elemento no cambia
    const contenedor = document.getElementById("contenedorDimensiones");
    contenedor.innerHTML = ""; // Limpiar contenido anterior

    // Crear un campo de filas y columnas para cada matriz
    // → let i: la variable de bucle se reasigna en cada iteración
    for (let i = 0; i < cantidadMatrices; i++) {
        // Crear un párrafo para la Matriz i+1
        // → const: el elemento se crea una vez y no se reasigna
        const parrafo = document.createElement("p");
        parrafo.innerHTML =
            "Matriz " + (i + 1) + " - " +
            "Filas: <input type='number' id='filas" + i + "' min='1' value='2' style='width:50px; border:2px solid black;'> " +
            "Columnas: <input type='number' id='columnas" + i + "' min='1' value='2' style='width:50px; border:2px solid black;'>";

        contenedor.appendChild(parrafo);
    }
}
// FASE 2 - Generar la estructura visual de cada matriz
// con inputs para ingresar los valores

function generarMatrices() {
    // Validar que se haya generado el formulario primero
    if (cantidadMatrices === 0) {
        alert("Primero confirme la cantidad de matrices.");
        return;
    }

    // → const: la referencia al contenedor no cambia
    const contenedor = document.getElementById("contenedorMatrices");
    contenedor.innerHTML = ""; // Limpiar matrices anteriores

    // Generar una tabla por cada matriz
    for (let i = 0; i < cantidadMatrices; i++) {
        // Leer filas y columnas de cada matriz
        // → const: se asignan una vez y no se modifican
        const filas = parseInt(document.getElementById("filas" + i).value);
        const columnas = parseInt(document.getElementById("columnas" + i).value);

        // Validar dimensiones
        if (isNaN(filas) || isNaN(columnas) || filas < 1 || columnas < 1) {
            alert("Las dimensiones de la Matriz " + (i + 1) + " no son válidas.");
            return;
        }

        // Crear título de la matriz
        const titulo = document.createElement("h3");
        titulo.textContent = "Matriz " + (i + 1) + " (" + filas + " x " + columnas + ")";
        contenedor.appendChild(titulo);

        // Crear la tabla
        const tabla = document.createElement("table");

        // Crear filas y columnas con inputs
        for (let f = 0; f < filas; f++) {
            const fila = document.createElement("tr");

            for (let c = 0; c < columnas; c++) {
                const celda = document.createElement("td");

                // Crear input dentro de cada celda
                const input = document.createElement("input");
                input.type = "number";
                input.value = "0";
                // El id identifica la matriz, la fila y la columna
                input.id = "m" + i + "_f" + f + "_c" + c;

                celda.appendChild(input);
                fila.appendChild(celda);
            }

            tabla.appendChild(fila);
        }

        contenedor.appendChild(tabla);
    }
}


// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

// Lee los valores de la pantalla y arma una matriz (array 2D)
function leerMatriz(indiceMatriz) {
    const filas = parseInt(document.getElementById("filas" + indiceMatriz).value);
    const columnas = parseInt(document.getElementById("columnas" + indiceMatriz).value);

    // → const: el array no se reasigna, solo se le hace push
    const matriz = [];

    for (let f = 0; f < filas; f++) {
        const fila = [];
        for (let c = 0; c < columnas; c++) {
            const input = document.getElementById("m" + indiceMatriz + "_f" + f + "_c" + c);
            fila.push(parseInt(input.value));
        }
        matriz.push(fila);
    }

    return matriz;
}


// Muestra una matriz en el contenedor de resultado
function mostrarResultado(matriz) {
    const contenedor = document.getElementById("contenedorResultado");
    contenedor.innerHTML = ""; // Limpiar resultado anterior

    const tabla = document.createElement("table");

    for (let f = 0; f < matriz.length; f++) {
        const fila = document.createElement("tr");

        for (let c = 0; c < matriz[f].length; c++) {
            const celda = document.createElement("td");
            celda.textContent = matriz[f][c];
            fila.appendChild(celda);
        }

        tabla.appendChild(fila);
    }

    contenedor.appendChild(tabla);
}


// ============================================================
// FASE 3 - SUMA de matrices
// ============================================================

function sumarMatrices() {
    // Verificar que las matrices estén generadas
    if (cantidadMatrices < 2) {
        alert("Primero genere las matrices.");
        return;
    }

    // Leer las dos primeras matrices
    const matrizA = leerMatriz(0);
    const matrizB = leerMatriz(1);

    // Verificar que tengan las mismas dimensiones
    const filasA = matrizA.length;
    const columnasA = matrizA[0].length;
    const filasB = matrizB.length;
    const columnasB = matrizB[0].length;

    if (filasA !== filasB || columnasA !== columnasB) {
        alert("Para sumar, las matrices deben tener las mismas dimensiones.\n" +
            "Matriz 1: " + filasA + "x" + columnasA + "\n" +
            "Matriz 2: " + filasB + "x" + columnasB);
        return;
    }

    // Realizar la suma
    // → const: el array resultado no se reasigna, solo se le hace push
    const resultado = [];

    for (let f = 0; f < filasA; f++) {
        const fila = [];
        for (let c = 0; c < columnasA; c++) {
            fila.push(matrizA[f][c] + matrizB[f][c]);
        }
        resultado.push(fila);
    }

    // Mostrar el resultado
    mostrarResultado(resultado);
}


// ============================================================
// FASE 3 - MULTIPLICACIÓN de matrices
// ============================================================

function multiplicarMatrices() {
    // Verificar que las matrices estén generadas
    if (cantidadMatrices < 2) {
        alert("Primero genere las matrices.");
        return;
    }

    // Leer las dos primeras matrices
    const matrizA = leerMatriz(0);
    const matrizB = leerMatriz(1);

    const filasA = matrizA.length;
    const columnasA = matrizA[0].length;
    const filasB = matrizB.length;
    const columnasB = matrizB[0].length;

    // VALIDACIÓN: columnas de A deben ser iguales a filas de B
    if (columnasA !== filasB) {
        alert("No se puede multiplicar: el número de columnas de la Matriz 1 (" + columnasA + ") " +
            "debe ser igual al número de filas de la Matriz 2 (" + filasB + ").");
        return;
    }

    // Crear la matriz resultado con ceros (filasA x columnasB)
    const resultado = [];
    for (let f = 0; f < filasA; f++) {
        const fila = [];
        for (let c = 0; c < columnasB; c++) {
            fila.push(0);
        }
        resultado.push(fila);
    }

    // Realizar la multiplicación
    for (let f = 0; f < filasA; f++) {
        for (let c = 0; c < columnasB; c++) {
            for (let k = 0; k < columnasA; k++) {
                resultado[f][c] += matrizA[f][k] * matrizB[k][c];
            }
        }
    }

    // Mostrar el resultado
    mostrarResultado(resultado);
}
