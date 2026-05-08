const imagenes = [

{
    url: "/imagenes/imagen1.webp",

    nombre: "Fútbol",

    descripcion:
    "Aquí encontrarás toda la información sobre fútbol."
},

{
    url: "/imagenes/imagen2.webp",

    nombre: "Baloncesto",

    descripcion:
    "Aquí encontrarás toda la información sobre baloncesto."
},

{
    url: "/imagenes/imagen3.webp",

    nombre: "Voleibol",

    descripcion:
    "Aquí encontrarás toda la información sobre voleibol."
}

];



const atras = document.getElementById("atras");

const adelante = document.getElementById("adelante");

const imagen = document.getElementById("img");

const texto = document.getElementById("texto");

const puntos = document.getElementById("puntos");

let actual = 0;



/* MOSTRAR IMAGEN */

function mostrarImagen(){

    imagen.innerHTML = `

        <img
            class="img"
            src="${imagenes[actual].url}"
            alt="${imagenes[actual].nombre}"
        >

    `;

    texto.innerHTML = `

        <h3>${imagenes[actual].nombre}</h3>

        <p>${imagenes[actual].descripcion}</p>

    `;

    actualizarPuntos();
}



/* BOTON ADELANTE */

adelante.addEventListener("click", () => {

    actual++;

    if(actual >= imagenes.length){

        actual = 0;
    }

    mostrarImagen();
});



/* BOTON ATRAS */

atras.addEventListener("click", () => {

    actual--;

    if(actual < 0){

        actual = imagenes.length - 1;
    }

    mostrarImagen();
});



/* PUNTOS */

function actualizarPuntos(){

    puntos.innerHTML = "";

    for(let i = 0; i < imagenes.length; i++){

        if(i === actual){

            puntos.innerHTML += `
            <span class="punto activo"></span>
            `;
        }

        else{

            puntos.innerHTML += `
            <span class="punto"></span>
            `;
        }
    }
}



/* AUTO PLAY */

setInterval(() => {

    actual++;

    if(actual >= imagenes.length){

        actual = 0;
    }

    mostrarImagen();

}, 5000);



/* INICIAR */

mostrarImagen();
