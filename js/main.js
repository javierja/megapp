//Creo las variables que traen los elementos div por id
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-producto').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
//creo una variable tipo DocumentFragment paara crear un objeto nodo el cual no formara parte del Doom hasta que lo agregue 
//mediante un append 
const fragment = document.createDocumentFragment()
let carrito = {}

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado 
document.addEventListener('DOMContentLoaded', e => { fetchData() });
cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })



//Agrego productos



// Traer productos
const fetchData = async () => {
    const res = await fetch('./data/productos.json');
    const data = await res.json()
   
    pintarCards(data)
 
}

// Listar los productos
const pintarCards = data => {
    data.forEach(item => {
       
        templateCard.querySelector("img").setAttribute("src", item.imagen)
        templateCard.querySelector('h5').textContent = item.nombre
        templateCard.querySelector('p').textContent =  item.precio
        templateCard.querySelector('button').dataset.id = item.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}


// Obtengo mediante Jquery el div de 'idcompra'
const compra= $("#idcompra")[0];

compra.style.display = "none";

// Agregar al carrito
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        $('#idcompra').eq(0).fadeIn(500);
        setCarrito(e.target.parentElement)
    }
    //detengo la propagación, ejecucion, del evento
    e.stopPropagation()
}

const setCarrito = item => {
    
    const producto = {
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }
    // console.log(producto)
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }
    
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        //clono cada elemendo template carrito para que se creen los box por cada item...
        const clone = templateCarrito.cloneNode(true)
        //aagrego el elemento clonado al fragmento
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    }
    
    // suma cantidad y suma de totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)

    //hago una seleccionde los elementos html 'td' y 'spann' que es donde tengo la cantidad y el precio
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}


const confircompra=document.getElementById("compraform");




const btnAumentarDisminuir = e => {
   //mediante classlist prompruebo si existe la clase 'btn-info' y 'btn-danger'
   //para asi aumentar o disminuir la cantidad
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}




const confirmarcompra= (evento) =>{

    evento.preventDefault();
    
    
    //animacion concatenada con jquery
    $('#idcompra').eq(0).fadeOut(1000);
    $('#idarticulos').eq(0).fadeOut(1000);
    divagre.style.display = "none";
    pie.style.position = "fixed";
    $('#comprasuccess').eq(0).fadeIn(500);

}
const divagre= $("#bloqueagre")[0];
const pie= $("#pie")[0];

//Agrego en Jquery el evento del formulario 'submit' de la confirmación de la compra y la activacion de mensaje exitoso


$( "#compraform" ).submit(confirmarcompra)