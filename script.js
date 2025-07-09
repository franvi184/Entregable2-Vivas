const input = document.getElementById("inputTareas");
const botAgregar = document.querySelector(".agregar");
const botVerTareas = document.querySelector(".verTareas");
const botCompras = document.querySelector(".compras");
const botTrabajo = document.querySelector(".trabajo");
const botOtros = document.querySelector(".otros");
const contenedor = document.getElementById("contenedor")
const incompleto = document.getElementById("incompleto")

const contenedorLista = document.getElementById("tareas")

let tipoSeleccionado = ""

//asignamos arrays
let compras = []
let trabajo = []
let otros = []

//seleccion de tipo
botCompras.addEventListener("click", () => {
    tipoSeleccionado = "compras"
    incompleto.style.display = "block"
    incompleto.textContent = `Su tipo seleccionado fue: ${tipoSeleccionado}`
})

botTrabajo.addEventListener("click", () => {
    tipoSeleccionado = "trabajo"
    incompleto.style.display = "block"
    incompleto.textContent = `Su tipo seleccionado fue: ${tipoSeleccionado}`
})

botOtros.addEventListener("click", () => {
    tipoSeleccionado = "otros"
    incompleto.style.display = "block"
    incompleto.textContent = `Su tipo seleccionado fue: ${tipoSeleccionado}`
})

//para agregar las tareas
function agregarTarea() {
    //obtenemos el input
    const valor = input.value.trim();
    
    //chequeamos que el input no este vacio
    if (valor === ""){
        incompleto.style.display = "block"
        incompleto.textContent = "Ingresar una tarea por favor"
        return;
    }
    
    //chequeamos que tenga tipo seleccionado
    if (tipoSeleccionado === ""){
        incompleto.style.display = "block"
        incompleto.textContent = "Ingresar el tipo de tarea por favor"
        return;
        //lo mandamos a nuestro array
    } else if (tipoSeleccionado === "compras"){
        incompleto.style.display = "none"
        compras.push(valor)
    } else if (tipoSeleccionado === "trabajo"){
        incompleto.style.display = "none"
        trabajo.push(valor)
    } else if (tipoSeleccionado === "otros"){
        incompleto.style.display = "none"
        otros.push(valor)
    }
    input.value = ""
    mostrarTareas()
}

//para poder mostar los tipos de tareas
function mostrarPorTipo(titulo, array) {
    const tituloElemento = document.createElement("h3");
    tituloElemento.textContent = titulo;
    tituloElemento.style.textAlign = "center"
    contenedorLista.appendChild(tituloElemento);
    //recorremos los arrays para poder mostrarlos
    array.forEach((tarea, index) => {
        const pTarea = document.createElement("p");
        pTarea.classList.add("estiloNuevo")
        pTarea.classList.add("tarea");
        
        const texto = document.createElement("span");
        texto.style.fontSize = "25px"
        texto.textContent = tarea;
        //boton de eliminar
        const btnEliminar = document.createElement("button")
        btnEliminar.textContent = "Eliminar"
        btnEliminar.style.marginLeft = "34rem";
        btnEliminar.addEventListener("click", () => {
            array.splice(index, 1); // Borra del array
            mostrarTareas(); // Vuelve a mostrar actualizado
        });

        pTarea.appendChild(texto);
        pTarea.appendChild(btnEliminar)
        contenedorLista.appendChild(pTarea);
    });
}

function mostrarTareas(){
    contenedorLista.innerHTML = "";
    const mensaje = document.getElementById("noTareas")
    //analizamos si tenemos tareas pedientes
    const hayTareas = compras.length > 0 || trabajo.length > 0 || otros.length > 0
    //si no tenemos tareas, damos el msj de que no tenemos nada
    if(!hayTareas){
        mensaje.style.display = "block"
        return;
    }
    mensaje.style.display = "none"
    //si tenemos tareas, las mostramos
    if(compras.length > 0){
        mostrarPorTipo("Compras", compras)
    }
    if(trabajo.length > 0){
        mostrarPorTipo("Trabajo", trabajo)
    }
    if(otros.length > 0){
        mostrarPorTipo("Otros", otros)
    }
}

botVerTareas.addEventListener("click", mostrarTareas)
botAgregar.addEventListener("click", agregarTarea)

