# Documentación — `matrices.js`
### Trabajo Práctico 5 — Operaciones con Matrices

---

## Estructura general del proyecto

```
trabajo_practico_5/
├── index.html     ← estructura visual (HTML)
└── matrices.js    ← toda la lógica (JavaScript)
```

El HTML solo tiene los elementos en pantalla.  
El archivo `matrices.js` contiene **todas las funciones** que dan vida a la página.

---

## Conceptos previos importantes

### ¿Qué es el DOM?
El **DOM** (Document Object Model) es la representación del HTML como un árbol de objetos que JavaScript puede leer y modificar.  
Cuando hacemos `document.getElementById("algo")`, le pedimos al navegador que busque en ese árbol el elemento con ese `id`.

### ¿Qué es un array bidimensional (matriz)?
Un array normal guarda una lista de valores:
```js
var fila = [1, 2, 3];
```
Un array bidimensional es un array **de arrays** (una lista de filas):
```js
var matriz = [
    [1, 2, 3],   // fila 0
    [4, 5, 6],   // fila 1
    [7, 8, 9]    // fila 2
];

// Acceder a un elemento: matriz[fila][columna]
console.log(matriz[1][2]); // → 6
```

---

## Variable global

```js
let cantidadMatrices = 0;
```

**¿Qué es?** Una variable declarada fuera de todas las funciones.  
**¿Para qué sirve?** Al estar en el ámbito global, **todas las funciones del archivo pueden leerla y modificarla**.  
Sin esta variable, cada función "olvidaría" cuántas matrices hay.  
Se declara con `let` (y no `const`) porque su valor se reasigna dentro de `generarFormularioDimensiones()`.

---

## Funciones — Descripción y ejemplos

---

### 1. `generarFormularioDimensiones()`

**Fase:** 1  
**¿Qué hace?**  
Lee la cantidad de matrices del input, valida que sea ≥ 2, y por cada matriz crea dinámicamente un párrafo con dos inputs (filas y columnas) usando el DOM.

**Conceptos que practica:**
- `document.getElementById()` — buscar un elemento por su id
- `parseInt()` — convertir texto a número entero
- `isNaN()` — verificar si algo NO es un número
- `document.createElement()` — crear un elemento HTML nuevo
- `.innerHTML` — escribir HTML dentro de un elemento
- `.appendChild()` — agregar un elemento hijo a un padre

**Ejemplo práctico — probar en la consola del navegador (F12):**

```js
// Simular lo que hace getElementById + parseInt
const texto = "3";          // lo que vendría del input
const numero = parseInt(texto);
console.log(numero);        // → 3
console.log(isNaN(numero)); // → false (sí es un número)

const textoMalo = "abc";
console.log(isNaN(parseInt(textoMalo))); // → true (no es número)
```

```js
// Simular creación dinámica de un elemento
const parrafo = document.createElement("p");
parrafo.innerHTML = "Filas: <input type='number' value='2'>";
document.body.appendChild(parrafo); // lo agrega al final del body
```

---

### 2. `generarMatrices()`

**Fase:** 2  
**¿Qué hace?**  
Por cada matriz definida en la Fase 1, crea una tabla HTML donde **cada celda contiene un `<input>`** para ingresar los valores. Los inputs tienen un `id` único con el formato `m0_f1_c2` (matriz 0, fila 1, columna 2).

**Conceptos que practica:**
- Bucles `for` anidados (fila dentro de columna)
- Creación dinámica de elementos: `table`, `tr`, `td`, `input`
- Asignación de `id` dinámicos para poder leer los valores después
- `.appendChild()` en cadena para armar la estructura

**Ejemplo práctico — entender los ids generados:**

```js
// El id "m0_f1_c2" significa:
// m0 → Matriz número 0 (la primera)
// f1 → Fila número 1 (la segunda fila, ya que empieza en 0)
// c2 → Columna número 2 (la tercera columna)

// Para leer ese input desde la consola:
const input = document.getElementById("m0_f1_c2");
console.log(input.value); // muestra el valor que tiene ese input
```

```js
// Simular la creación de una tabla 2x2 manualmente:
const tabla = document.createElement("table");

for (let f = 0; f < 2; f++) {           // 2 filas
    const fila = document.createElement("tr");
    for (let c = 0; c < 2; c++) {       // 2 columnas
        const celda = document.createElement("td");
        celda.textContent = "f" + f + " c" + c; // solo texto de ejemplo
        fila.appendChild(celda);
    }
    tabla.appendChild(fila);
}

document.body.appendChild(tabla);
// Resultado visual: tabla con "f0 c0", "f0 c1", "f1 c0", "f1 c1"
```

---

### 3. `leerMatriz(indiceMatriz)` — *Función auxiliar*

**¿Qué hace?**  
Recorre todos los inputs de una matriz en pantalla y los convierte en un **array bidimensional** (de números). Recibe el índice de la matriz (0 para la primera, 1 para la segunda).

**Conceptos que practica:**
- `document.getElementById()` con id dinámico
- `.push()` para agregar elementos a un array
- Arrays bidimensionales (array de arrays)
- `parseInt()` para convertir el texto del input a número

**Ejemplo práctico — entender `.push()` y arrays 2D:**

```js
// Construir un array 2D manualmente (simula lo que hace leerMatriz)
const matriz = [];          // array vacío de filas

for (let f = 0; f < 3; f++) {
    const fila = [];        // array vacío de columnas
    for (let c = 0; c < 3; c++) {
        fila.push(f * 3 + c + 1); // valores del 1 al 9
    }
    matriz.push(fila);    // agregar la fila completa
}

console.log(matriz);
// → [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

console.log(matriz[1][2]); // → 6  (fila 1, columna 2)
```

```js
// Simular leer un input por id (con la página abierta y las matrices generadas)
const indice = 0;  // queremos la Matriz 1
const f = 0;
const c = 1;
const id = "m" + indice + "_f" + f + "_c" + c;  // → "m0_f0_c1"
const valor = parseInt(document.getElementById(id).value);
console.log(valor); // muestra el número ingresado en esa celda
```

---

### 4. `mostrarResultado(matriz)` — *Función auxiliar*

**¿Qué hace?**  
Recibe un array 2D con los resultados y los muestra en una tabla HTML dentro del `div` con id `contenedorResultado`. Es la función "de salida" del programa.

**Conceptos que practica:**
- Recorrer un array 2D con `for`
- `.length` para saber cuántas filas/columnas tiene
- `textContent` para poner texto en una celda (sin HTML)
- `.innerHTML = ""` para limpiar el contenido anterior antes de mostrar el nuevo

**Ejemplo práctico — mostrar cualquier array 2D en pantalla:**

```js
// Prueba directa en la consola (con la página abierta):
const miMatriz = [
    [10, 20],
    [30, 40]
];

// Llamar a la función directamente
mostrarResultado(miMatriz);
// La función leerá el array y construirá la tabla en el div "contenedorResultado"
```

```js
// Entender .length en arrays 2D
const mat = [[1, 2, 3], [4, 5, 6]];
console.log(mat.length);     // → 2  (cantidad de filas)
console.log(mat[0].length);  // → 3  (cantidad de columnas de la fila 0)
```

---

### 5. `sumarMatrices()`

**Fase:** 3  
**¿Qué hace?**  
Lee las dos matrices de la pantalla con `leerMatriz()`, verifica que tengan las **mismas dimensiones** (condición para poder sumar), recorre celda por celda sumando los valores, y muestra el resultado.

**Regla matemática:**  
Para sumar: `Resultado[f][c] = A[f][c] + B[f][c]`  
Las dimensiones deben ser idénticas (mismo número de filas Y columnas).

**Conceptos que practica:**
- Llamadas a otras funciones (`leerMatriz`, `mostrarResultado`)
- Acceso a propiedades de arrays: `.length`
- Condicional `if` para validar
- Bucles `for` anidados para operar celda por celda

**Ejemplo práctico — suma de matrices sin DOM:**

```js
// Probar el algoritmo de suma de forma aislada en la consola:
const A = [
    [1, 2],
    [3, 4]
];
const B = [
    [5, 6],
    [7, 8]
];

// Validar dimensiones
if (A.length === B.length && A[0].length === B[0].length) {
    const resultado = [];

    for (let f = 0; f < A.length; f++) {
        const fila = [];
        for (let c = 0; c < A[0].length; c++) {
            fila.push(A[f][c] + B[f][c]);
        }
        resultado.push(fila);
    }

    console.log(resultado);
    // → [[6, 8], [10, 12]]
} else {
    console.log("No se pueden sumar: dimensiones distintas.");
}
```

> **Caso de error para probar:**
> ```js
> const A = [[1, 2, 3]];  // 1x3
> const B = [[1, 2]];     // 1x2
> // A.length === B.length → true (ambas tienen 1 fila)
> // A[0].length === B[0].length → false (3 ≠ 2)  ← la validación lo detecta
> ```

---

### 6. `multiplicarMatrices()`

**Fase:** 3  
**¿Qué hace?**  
Lee las dos matrices, valida que las **columnas de A sean iguales a las filas de B** (condición matemática de la multiplicación), inicializa la matriz resultado con ceros, y aplica el algoritmo de multiplicación con **tres bucles `for` anidados**.

**Regla matemática:**  
`Resultado[f][c] = suma de A[f][k] * B[k][c]` para cada `k`  
La matriz resultado tiene dimensiones: **filas de A × columnas de B**

**Conceptos que practica:**
- Validación con condición matemática específica
- Inicialización de una matriz resultado con ceros
- **Triple bucle `for`** (el más complejo del ejercicio)
- Acumulación: `resultado[f][c] += ...`

**Ejemplo práctico — multiplicación de matrices sin DOM:**

```js
// Probar el algoritmo de multiplicación de forma aislada:
const A = [
    [1, 2, 3],   // 2x3
    [4, 5, 6]
];
const B = [
    [7,  8],     // 3x2
    [9,  10],
    [11, 12]
];

// A tiene 2 filas y 3 columnas
// B tiene 3 filas y 2 columnas
// → Se puede multiplicar porque columnas(A) === filas(B): 3 === 3
// → El resultado tendrá: filas(A) x columnas(B) = 2x2

const filasA = A.length;        // 2
const columnasA = A[0].length;  // 3
const columnasB = B[0].length;  // 2

// Inicializar resultado con ceros
const resultado = [];
for (let f = 0; f < filasA; f++) {
    const fila = [];
    for (let c = 0; c < columnasB; c++) {
        fila.push(0);
    }
    resultado.push(fila);
}

// Triple bucle para multiplicar
for (let f = 0; f < filasA; f++) {
    for (let c = 0; c < columnasB; c++) {
        for (let k = 0; k < columnasA; k++) {
            resultado[f][c] += A[f][k] * B[k][c];
        }
    }
}

console.log(resultado);
// → [[58, 64], [139, 154]]
```

> **Verificación manual de un elemento:**  
> `resultado[0][0]` = A[0][0]*B[0][0] + A[0][1]*B[1][0] + A[0][2]*B[2][0]  
> = 1×7 + 2×9 + 3×11 = 7 + 18 + 33 = **58** ✓

> **Caso de error para probar:**
> ```js
> const A = [[1, 2]];        // 1x2: columnas = 2
> const B = [[3], [4], [5]]; // 3x1: filas = 3
> // columnasA (2) !== filasB (3) → NO se puede multiplicar
> ```

---

## Lógica de programación por fases

Esta sección explica el **flujo completo de ejecución** del programa: qué sucede en cada fase, qué datos se generan, y cómo cada fase depende de la anterior.

---

### Fase 1 — Configuración: ¿cuántas matrices y de qué tamaño?

**Objetivo:** Que el usuario defina la cantidad de matrices y sus dimensiones (filas y columnas).

**Lógica paso a paso:**

1. El usuario escribe un número en el input `cantidadMatrices` (mínimo 2).
2. Al presionar **"Confirmar cantidad"**, se llama a `generarFormularioDimensiones()`.
3. La función lee ese número, lo valida con `parseInt()` e `isNaN()`, y lo guarda en la variable global `cantidadMatrices`.
4. Luego, con un bucle `for`, crea dinámicamente un párrafo con dos inputs por cada matriz: uno para **filas** y otro para **columnas**.
5. Cada input recibe un `id` único: `filas0`, `columnas0`, `filas1`, `columnas1`, etc., para poder leerlos después.

```
[Input cantidad] → generarFormularioDimensiones() → [Inputs filas/columnas por cada matriz]
```

**Estado al final de la Fase 1:**  
Existen en el DOM inputs con los ids `filas0`, `columnas0`, `filas1`, `columnas1`, etc.  
La variable global `cantidadMatrices` tiene el valor ingresado.

---

### Fase 2 — Visualización: mostrar las matrices e ingresar valores

**Objetivo:** Dibujar en pantalla las matrices vacías para que el usuario pueda completar sus valores.

**Lógica paso a paso:**

1. Al presionar **"Confirmar dimensiones"**, se llama a `generarMatrices()`.
2. La función verifica que `cantidadMatrices > 0` (que la Fase 1 fue completada).
3. Con un bucle `for` externo recorre cada matriz (de `0` a `cantidadMatrices - 1`).
4. Para cada matriz, lee sus dimensiones desde los inputs creados en la Fase 1.
5. Con **dos bucles `for` anidados** (filas × columnas) construye una tabla HTML donde cada celda contiene un `<input type="number">` con valor inicial `0`.
6. Cada input recibe un `id` con el formato `m0_f1_c2` que codifica: **matriz**, **fila** y **columna**.

```
[Inputs filas/columnas] → generarMatrices() → [Tablas HTML con inputs editables]
```

**¿Por qué los ids son importantes?**  
El id `m1_f0_c2` significa: *el input de la Matriz 2, fila 0, columna 2*.  
Gracias a este sistema, la Fase 3 puede recuperar cualquier valor exacto del DOM sin confusiones.

**Estado al final de la Fase 2:**  
El DOM contiene tablas con inputs. El usuario puede ingresar los números que desea operar.

---

### Fase 3 — Operaciones: suma y multiplicación

**Objetivo:** Leer los valores ingresados, ejecutar la operación matemática seleccionada y mostrar el resultado.

Esta fase está compuesta por **cuatro funciones** que trabajan en conjunto:

```
sumarMatrices()       ─┐
multiplicarMatrices() ─┤→ leerMatriz() → [array 2D] → operación → mostrarResultado()
```

#### 3a. `leerMatriz(indice)` — Leer del DOM al array

Antes de operar, se deben tomar los valores de la pantalla y convertirlos a una estructura de datos de JavaScript.  
Esta función recorre todos los inputs de una matriz usando sus ids y construye un **array bidimensional** con `push()`.

```
[Inputs del DOM: m0_f0_c0, m0_f0_c1, ...] → [[val, val], [val, val]]
```

#### 3b. Suma — algoritmo celda a celda

**Condición previa:** Las dos matrices deben tener **las mismas dimensiones** (misma cantidad de filas Y columnas).  
**Lógica:** Se recorren las matrices con dos bucles anidados y se suma la celda correspondiente de cada una.

```
Resultado[f][c] = A[f][c] + B[f][c]
```

La matriz resultado tiene las **mismas dimensiones** que las originales.

#### 3c. Multiplicación — algoritmo de triple bucle

**Condición previa (validación matemática):** El número de **columnas de A** debe ser igual al número de **filas de B**.  
Si no se cumple, no existe resultado posible y se muestra un `alert`.

**Lógica en tres pasos:**

1. **Inicializar** la matriz resultado con ceros. Su tamaño es: `filas(A) × columnas(B)`.
2. Recorrer con **tres bucles anidados**: `f` (filas del resultado), `c` (columnas del resultado), `k` (índice de acumulación).
3. **Acumular** el producto: `resultado[f][c] += A[f][k] * B[k][c]`

```
          k →
     A[f][k] × B[k][c] → se acumula en resultado[f][c]
     f ↓               c →
```

#### 3d. `mostrarResultado(matriz)` — Escribir al DOM

Una vez calculado el resultado (un array 2D), esta función lo convierte en una tabla HTML y la inserta en el `div` con id `contenedorResultado`.  
Primero limpia cualquier resultado anterior con `.innerHTML = ""`, luego construye la tabla recorriendo el array con dos bucles.

**Estado al final de la Fase 3:**  
El resultado de la operación es visible en pantalla como tabla HTML.

---

### Diagrama de flujo general

```
[index.html]
     │
     ├── Botón "Confirmar cantidad"
     │       └── generarFormularioDimensiones()
     │               └── Crea inputs: filas0, columnas0, filas1, columnas1...
     │
     ├── Botón "Confirmar dimensiones"
     │       └── generarMatrices()
     │               └── Crea tablas con inputs: m0_f0_c0, m0_f0_c1...
     │
     ├── Botón "Sumar Matrices"
     │       └── sumarMatrices()
     │               ├── leerMatriz(0) → matrizA
     │               ├── leerMatriz(1) → matrizB
     │               ├── Valida: mismas dimensiones
     │               ├── Calcula resultado
     │               └── mostrarResultado(resultado)
     │
     └── Botón "Multiplicar Matrices"
             └── multiplicarMatrices()
                     ├── leerMatriz(0) → matrizA
                     ├── leerMatriz(1) → matrizB
                     ├── Valida: columnas(A) === filas(B)
                     ├── Inicializa resultado con ceros
                     ├── Triple bucle de multiplicación
                     └── mostrarResultado(resultado)
```

---

## Resumen de funciones

| Función | Fase | Parámetros | Retorna | Interactúa con el DOM |
|---|---|---|---|---|
| `generarFormularioDimensiones()` | 1 | ninguno | nada | ✅ Sí |
| `generarMatrices()` | 2 | ninguno | nada | ✅ Sí |
| `leerMatriz(indiceMatriz)` | auxiliar | número (índice) | array 2D | ✅ Sí (solo lee) |
| `mostrarResultado(matriz)` | auxiliar | array 2D | nada | ✅ Sí (solo escribe) |
| `sumarMatrices()` | 3 | ninguno | nada | ✅ Sí (a través de auxiliares) |
| `multiplicarMatrices()` | 3 | ninguno | nada | ✅ Sí (a través de auxiliares) |

---

## Cómo probar las funciones por separado

1. Abrir `index.html` en el navegador
2. Presionar **F12** para abrir las herramientas de desarrollo
3. Ir a la pestaña **Consola**
4. Copiar y pegar cualquiera de los ejemplos de este documento

> Las funciones `sumarMatrices()` y `multiplicarMatrices()` también se pueden llamar directamente  
> desde la consola **después de haber generado las matrices en pantalla**:
> ```js
> sumarMatrices()
> multiplicarMatrices()
> ```
