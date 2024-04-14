// Variables globales

let pisoInicial = [
  {
    piso: "3",
    no_aprovechables: 0,
    organicos: 0,
    aprovechables: 0,
  },

  {
    piso: "4",
    no_aprovechables: 0,
    organicos: 0,
    aprovechables: 0,
  },

  {
    piso: "5",
    no_aprovechables: 0,
    organicos: 0,
    aprovechables: 0,
  },
];

let tipoCanecaAgregar;

//Selectores

const piso = document.getElementById("select_floor");
const btnOpenModal = document.getElementById("btnOpenModal");
const caneca = document.querySelectorAll(".bowl");
const btnSubmit = document.getElementById("btnSubmit");

///Evento o escuchadores

document.addEventListener("DOMContentLoaded", () => {

    const puntosEcoCache = localStorage.getItem("puntosEcologicos")

    if (puntosEcoCache){
        pisoInicial = JSON.parse(puntosEcoCache)
    }

  //1- Llamar a la funcion que pinta o que lista los numeros en cada caneca
  pintarPuntoEcologico();
});

piso.addEventListener("input", () => {
  pintarPuntoEcologico();
});

//*Recorro toda mi lista de nodos (Etiqueta HTML)

caneca.forEach((caneca) => {
  //*Y agrego a cada una el escuchador del el evento click
  caneca.addEventListener("click", () => {
    //*Ejecuatamos el evento click para el boton encargado de abrir el modal
    btnOpenModal.click();

    //*Obtengo el valor de el atributo type-bowl
    tipoCanecaAgregar = caneca.getAttribute("type-bowl");
  });
});

btnSubmit.addEventListener("click", () => {
  //*Obtengo el valor de la cantdad a agregar
  const cantidadAgregar = document.getElementById("cantidad").value;
  //*Y el piso en el cual el usuario esta depositando los desechos
  const pisoAgregar = piso.value;

  //1- Recorrer la lista de puntos ecologicos

  pisoInicial.forEach((puntoEco) => {
    //1.2- Buscar el piso a modificar

    if (puntoEco.piso == pisoAgregar) {
      //1.3- Modificar la caneca correspondiente
      puntoEco[tipoCanecaAgregar] += parseInt(cantidadAgregar);

      //*Cierro el modal
      document.querySelector("#btnCloseModal").click();

      //*Le hago reset a la entrada (input)
      document.getElementById("cantidad").value = "";
    }
  });

  pintarPuntoEcologico();
});

console.log(pisoInicial);

function pintarPuntoEcologico() {

  //1-Recorrer la lista de pisoInicial

  pisoInicial.forEach((puntoEco) => {
      //1.1- Preguntar o verificar el piso que el usuario desea ver
    if (puntoEco.piso == piso.value){
        //1.2- Seleccionamos cada uno de los contadores y asigar su valor
        const contadorOrganicos = document.querySelector("#organicos .body_top span")
        const contadorNoAprovechables = document.querySelector("#no_aprovechables .body_top span")
        const contadorAprovechables = document.querySelector("#aprovechables .body_top span")

        contadorOrganicos.textContent =  `${puntoEco.organicos}/500`;
        contadorNoAprovechables.textContent =  `${puntoEco.no_aprovechables}/500`;
        contadorAprovechables.textContent =  `${puntoEco.aprovechables}/500`;

        //Sacar promedio
        const suma = puntoEco.organicos + puntoEco.no_aprovechables + puntoEco.aprovechables;

        const porcentaje = ((suma) / 1500)* 100;
        const estado_piso = document.querySelector("#estado_piso");

        if (porcentaje < 20){
            document.body.style.background = "#950101";
            estado_piso.textContent = `Estado del piso ${piso.value}: No amigo del ambiente.`;

        }

        if (porcentaje >= 20 && porcentaje < 50){
            estado_piso.textContent = `Estado del piso ${piso.value}: Normal`;
            document.body.style.background = "#fc4b08"
        }

        if (porcentaje >= 50){
            estado_piso.textContent = `Estado del piso ${piso.value}: Amigable con el medio ambiente.`;
            document.body.style.background = "#6fd513"
        }

        if(porcentaje <= 0){
            estado_piso.textContent = `Estado del piso ${piso.value}`;          
            document.body.style.background = "#222"
        }

        console.log(porcentaje);
    }
  })

  localStorage.setItem("puntosEcologicos", JSON.stringify(pisoInicial))
}

