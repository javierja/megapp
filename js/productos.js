document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

box_search =document.getElementById('cards');

function buscador_interno(){


    filter = inputSearch.value.toUpperCase();
    li = document.getElementsByClassName("card");
    
    //Recorriendo elementos a filtrar mediante los "li"
    for (i = 0; i < li.length; i++){

        a = li[i].getElementsByTagName("h5")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){

            li[i].style.display = "";
            box_search.style.display = "block";

            if (inputSearch.value === ""){
                box_search.style.display = "inline-flex";
            }

        }else{
            li[i].style.display = "none";
        }

    }

}



$( "#agregabot" ).click(muestro_agr)

function muestro_agr(){
 
    $('#divagrego').eq(0).fadeIn(800);

}




let datosnvo = {}
function agregoart(){
    const nombre=  $( "#nombreart" ).val()
    const precio= $( "#precioart" ).val()
    let id=templateCard.querySelector('button').dataset.id 
    // console.log(id)
    let idint=parseInt(id)
    idnvo=idint+1

    // console.log(nombre,precio)
    $.getJSON('./data/productos.json', (res) =>
    {
  
    

    // const datoactual= res[res.length - 1]
    // id=parseInt(datoactual.id);
    // idnvo=id+1
    // console.log(idnvo)
   

    res.push({"id":idnvo, "nombre": nombre, "precio": precio,"imagen":'./img/sinimagen.jpg',"id_compra":idnvo})
   
    const datosnvo= res[res.length - 1]
    // console.log(datosnvo)
    // console.log(Object.values(datosnvo))

    Object.values(datosnvo).forEach(item => {
    
        

        templateCard.querySelector("img").setAttribute("src", datosnvo.imagen)
        templateCard.querySelector('h5').textContent = datosnvo.nombre
        templateCard.querySelector('p').textContent =  datosnvo.precio
        templateCard.querySelector('button').dataset.id = datosnvo.id
       
    })
    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
    cards.appendChild(fragment)
    })

   
}
$( "#btnEnviar" ).click(agregoart)

// document.getElementById("btnEnviar").addEventListener('click', agregoart)
