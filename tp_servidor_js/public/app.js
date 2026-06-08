const filasASelect = document.querySelector('#filasA');
const columnasASelect = document.querySelector('#columnasA');
const filasBSelect = document.querySelector('#filasB');
const columnasBSelect = document.querySelector('#columnasB');
const generarABtn = document.querySelector('#generarA');
const generarBBtn = document.querySelector('#generarB');
const matrizAContainer = document.querySelector('#matrizA');
const matrizBContainer = document.querySelector('#matrizB');
const sumarBtn = document.querySelector('#sumar');
const multiplicarBtn = document.querySelector('#multiplicar');
const resultadoContainer = document.querySelector('#resultado');
const jsonResponse = document.querySelector('#jsonResponse');
const mensaje = document.querySelector('#mensaje');

const maxDimension = 6;
const defaultDimension = 2;

function crearOpciones(select, valorInicial) {
    select.innerHTML = '';
    for (let i = 1; i <= maxDimension; i += 1) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === valorInicial) option.selected = true;
        select.appendChild(option);
    }
}

function crearInputsMatriz(contenedor, filas, columnas) {
    contenedor.innerHTML = '';
    contenedor.style.gridTemplateColumns = `repeat(${columnas}, minmax(56px, 1fr))`;

    for (let fila = 0; fila < filas; fila += 1) {
        for (let columna = 0; columna < columnas; columna += 1) {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = '0';
            input.name = `celda-${fila}-${columna}`;
            input.dataset.fila = fila;
            input.dataset.columna = columna;
            contenedor.appendChild(input);
        }
    }
}

function inicializarMatrizA() {
    const filas = Number(filasASelect.value);
    const columnas = Number(columnasASelect.value);
    crearInputsMatriz(matrizAContainer, filas, columnas);
}

function inicializarMatrizB() {
    const filas = Number(filasBSelect.value);
    const columnas = Number(columnasBSelect.value);
    crearInputsMatriz(matrizBContainer, filas, columnas);
}

function leerMatriz(contenedor, filas, columnas) {
    const valores = [];
    const inputs = contenedor.querySelectorAll('input');

    for (let fila = 0; fila < filas; fila += 1) {
        const filaValores = [];
        for (let columna = 0; columna < columnas; columna += 1) {
            const input = inputs[fila * columnas + columna];
            const valor = input.value.trim();
            const numero = Number(valor);
            if (valor === '' || Number.isNaN(numero)) {
                throw new Error('Todos los valores deben ser números válidos.');
            }
            filaValores.push(numero);
        }
        valores.push(filaValores);
    }

    return valores;
}

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
}

function limpiarMensaje() {
    mensaje.textContent = '';
    mensaje.className = 'mensaje';
}

function mostrarResultado(resultado) {
    resultadoContainer.innerHTML = '';
    jsonResponse.textContent = JSON.stringify(resultado, null, 2);
    const filas = resultado.length;
    const columnas = resultado[0]?.length ?? 0;
    resultadoContainer.style.gridTemplateColumns = `repeat(${columnas}, minmax(56px, 1fr))`;

    for (let fila = 0; fila < filas; fila += 1) {
        for (let columna = 0; columna < columnas; columna += 1) {
            const celda = document.createElement('div');
            celda.className = 'result-cell';
            celda.textContent = resultado[fila][columna];
            resultadoContainer.appendChild(celda);
        }
    }
}

async function ejecutarOperacion(ruta) {
    limpiarMensaje();
    resultadoContainer.innerHTML = '';
    jsonResponse.textContent = '';

    const filasA = Number(filasASelect.value);
    const columnasA = Number(columnasASelect.value);
    const filasB = Number(filasBSelect.value);
    const columnasB = Number(columnasBSelect.value);

    try {
        const matrizA = leerMatriz(matrizAContainer, filasA, columnasA);
        const matrizB = leerMatriz(matrizBContainer, filasB, columnasB);

        const response = await fetch(ruta, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matrizA, matrizB }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error en la operación del servidor.');
        }

        mostrarMensaje('Operación exitosa.', 'success');
        mostrarResultado(data.resultado);
    }
    catch (error) {
        mostrarMensaje(error.message, 'error');
    }
}

crearOpciones(filasASelect, defaultDimension);
crearOpciones(columnasASelect, defaultDimension);
crearOpciones(filasBSelect, defaultDimension);
crearOpciones(columnasBSelect, defaultDimension);

inicializarMatrizA();
inicializarMatrizB();

filasASelect.addEventListener('change', inicializarMatrizA);
columnasASelect.addEventListener('change', inicializarMatrizA);
filasBSelect.addEventListener('change', inicializarMatrizB);
columnasBSelect.addEventListener('change', inicializarMatrizB);

generarABtn.addEventListener('click', inicializarMatrizA);
generarBBtn.addEventListener('click', inicializarMatrizB);

sumarBtn.addEventListener('click', () => ejecutarOperacion('/suma'));
multiplicarBtn.addEventListener('click', () => ejecutarOperacion('/producto'));
