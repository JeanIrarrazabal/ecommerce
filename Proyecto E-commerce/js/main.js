// base de datos de pasteles
const baseDeDatos = [
    {
      id: 1,
      nombreDelProducto: "Almendron Achocolatado",
      precioDelProducto: 13000,
      descripcionProducto: "Masa hecha en casa rellena con almendras, nueces y crema pastelera.",
      ImagenDelProducto: "./pasteles/ALMENDRÓN_ACHOCOLATADO.jpg"
    },

    {
      id: 2,
      nombreDelProducto: "Tartaleta de Frutas",
      precioDelProducto: 8000,
      descripcionProducto: "Pastel hecho a base de masa quebrada rellena con variedad de frutas y crema pastelera.",
      ImagenDelProducto: "./pasteles/TARTALETA_FRUTAS.jpg"
    },

    {
      id: 3,
      nombreDelProducto: "Kuchen de Nuez",
      precioDelProducto: 7000,
      descripcionProducto: "Pastel hecho a base de una masa quebrada rellena con mazana y nuez.",
      ImagenDelProducto: "./pasteles/kuchen_nuez.jpg"
    },

    {
      id: 4,
      nombreDelProducto: "Cheesecake de Chocolate",
      precioDelProducto: 9000,
      descripcionProducto: "Pastel hecho a base galletas artesanales queso crema y chocolate negro.",
      ImagenDelProducto: "./pasteles/CHEESECAKE_CHOCOLATE_NEGRO.jpg"
    },

    {
      id: 5,
      nombreDelProducto: "Pastel de Queso",
      precioDelProducto: 15000,
      descripcionProducto: "Pastel hecho a base galletas artesanales queso crema y chocolate negro.Torta a base de un biscocho mediano, relleno de manjar y crema.",
      ImagenDelProducto: "./pasteles/PASTEL_QUESO.jpg"
    },

    {
      id: 6,
      nombreDelProducto: "Strudel de Peras",
      precioDelProducto: 8000,
      descripcionProducto: "Masa delgada hecha en casa con relleno de peras y cubierto de chocolate.",
      ImagenDelProducto: "./pasteles/StrudelDePeras.jpg"
    },
  ];

let cards = ``;
let idCarrito= [];
let cardsCarrito =``;
let itemsAgregados = [];
let precioTotalDelCarrito = [];
let valorStorage= localStorage.totalCarrito;
let itemStorage= localStorage.productoCarrito;
let idStorage= localStorage.idDelCarrito;

//funcion para validar productos en el storage
//guarda el ID de los productos agregados al carrito
function idcarritoStorage() {
  if (idStorage == null) {
    idCarrito= [];
    return idCarrito;
  }else{
    idCarrito= [...JSON.parse(idStorage)];
    return idCarrito;
  }
}
idcarritoStorage()

//guarda los productos agregados al carrito en base al id
function productoCarritoStorage() {
  if (itemStorage == null) {
    itemsAgregados= [];
    return itemsAgregados;
  }else{
    itemsAgregados= [...JSON.parse(itemStorage)];
    return itemsAgregados;
  }
}
productoCarritoStorage()

//guarda el precio de los productos agregados al carrito en base al id
function preciocarritoStorage() {
  if (valorStorage == null) {
    precioTotalDelCarrito= [];
    return precioTotalDelCarrito;
  }else{
    precioTotalDelCarrito= [...JSON.parse(valorStorage)];
    return precioTotalDelCarrito;
  }
}
preciocarritoStorage()

//propiedades
class pasteles {
    nombre;
    precio;
    stock;
    Imagen;
    descripcion;


//inicializaciòn de valores
constructor(id,nombre, precio, stock, Imagen, descripcion){
    this.id= id;
    this.nombre= nombre;
    this.precio= precio;
    this.stock= stock;
    this.Imagen= Imagen;
    this.descripcion= descripcion;
    }

//metodo
validarStock(){
  return stock > 0;
  }
}

let primerProducto= new pasteles(baseDeDatos[0].id, baseDeDatos[0].nombreDelProducto, baseDeDatos[0].precioDelProducto, 10, baseDeDatos[0].ImagenDelProducto, baseDeDatos[0].descripcionProducto);
let segundoProducto= new pasteles(baseDeDatos[1].id, baseDeDatos[1].nombreDelProducto, baseDeDatos[1].precioDelProducto, 10, baseDeDatos[1].ImagenDelProducto, baseDeDatos[1].descripcionProducto);
let terceroProducto= new pasteles(baseDeDatos[2].id, baseDeDatos[2].nombreDelProducto, baseDeDatos[2].precioDelProducto, 10, baseDeDatos[2].ImagenDelProducto, baseDeDatos[2].descripcionProducto);
let cuartoProducto= new pasteles(baseDeDatos[3].id, baseDeDatos[3].nombreDelProducto, baseDeDatos[3].precioDelProducto, 10, baseDeDatos[3].ImagenDelProducto, baseDeDatos[3].descripcionProducto);
let QuintoProducto= new pasteles(baseDeDatos[4].id, baseDeDatos[4].nombreDelProducto, baseDeDatos[4].precioDelProducto, 10, baseDeDatos[4].ImagenDelProducto, baseDeDatos[4].descripcionProducto);
let SextoProducto= new pasteles(baseDeDatos[5].id, baseDeDatos[5].nombreDelProducto, baseDeDatos[5].precioDelProducto, 10, baseDeDatos[5].ImagenDelProducto, baseDeDatos[5].descripcionProducto);

// función para agregar productos al HTML
function AgregarProductoHtml() {
  for (let i=0; i<baseDeDatos.length; i++){
    cards += `<div class="col-md-4">
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img class="foto"src="${baseDeDatos[i].ImagenDelProducto}" class="card-img" alt="${baseDeDatos[i].nombreDelProducto}" width="180px" height="220px">
        </div>
      <div class="col-md-8">
        <div class="card-body">
          <h4 class="card-title">${baseDeDatos[i].nombreDelProducto}</h4>
          <p class="card-text">${baseDeDatos[i].descripcionProducto}</p>
          <p class="card-text"><small class="text-muted">$${baseDeDatos[i].precioDelProducto} c/u</small></p>
          <button onclick="anadirProductoAlCarrito(${baseDeDatos[i].id})" type="button" class="btn btn-success">Agregar</button>
        </div>
      </div>
      </div>
    </div>
  </div>`;
} 
return cards;
}

AgregarProductoHtml()
$(`#productos`).html(cards);

// función donde guarda el id de los productos agregados al carrito
function anadirProductoAlCarrito(id) {
  idCarrito.push(id);
  filterbasket(id);
  $(`#cantidadDelCarrito`).html(idCarrito.length)
  localStorage.setItem("idDelCarrito", JSON.stringify(idCarrito));

    // alerta de producto agregado
    $(`#alertaCarrito`).show(1000)
    $(`#alertaCarrito`).fadeOut(5000);
}

// agregar producto al carrito
function filterbasket(id) {
  const producto = baseDeDatos.filter((obj) => obj.id === id);
  itemsAgregados.push(producto);
  precioTotalDelCarrito.push(producto[0].precioDelProducto)
  localStorage.setItem("totalCarrito", JSON.stringify(precioTotalDelCarrito));
  localStorage.setItem("productoCarrito", JSON.stringify(itemsAgregados));
};

// función donde muestra mensaje cuando el carrito esta vacio     
function CarritoVacio() {
  if (idCarrito.length === 0) {
    $(`#carritoVacio`).show(2000);
    $(`#carritoVacio`).html(`Aún no tienes ningun producto en el carrito. <strong>¡Animate a comprar!</strong> `);
  }
}
CarritoVacio();

// funcion para escribir los datos en el carrito
function AnadirAlCarrito() {
  for (let i=0; i<itemsAgregados.length; i++) {
    cardsCarrito += `<div id="CardsItem" class="container">
    <div class="row">
        <main id="items" class="col-sm-8 row"></main>
        <!-- Carrito -->
        <aside class="col-sm-12">
        <br>
        <!-- Elementos del carrito -->
        <div class="toast-header">
          <div class="row">
          <div class="col-md-4">
          <img class="foto"src="${itemsAgregados[i][0].ImagenDelProducto}" class="card-img" alt="" width="140px" height="140px">
        </div>
      <div class="col-md-8">
        <div class="card-body">
          <p class="card-text">${itemsAgregados[i][0].nombreDelProducto}</p>
          <p><small id="carrito"> Precio del producto $ ${itemsAgregados[i][0].precioDelProducto}</small></p>
        </div>
        </aside>
        <hr>
    </div>
</div>`
  }
  return cardsCarrito;
}

AnadirAlCarrito();
$(`#itemsCarrito`).html(cardsCarrito);


//Funcion para sumar total en el carrito
let totalSuma = [];
function sumarCarrito(){
  let total=0;
  precioTotalDelCarrito.forEach(function(a){total += a;});
  $(`#sumaTotalCarrito`).html(total);
  $(`#cantidadCarrito`).html(precioTotalDelCarrito.length);
  totalSuma.push(total);
}
sumarCarrito();

//vaciar carrito
let boton = document.getElementById(`boton-vaciar`);
boton.addEventListener(`click`, function() {
  localStorage.clear();
  $(`#itemsCarrito`).html('');
  $(`#sumaTotalCarrito`).html('0');
  $(`#cantidadCarrito`).html('0');
},false);

//Funcion para pagar con Mercado Pago
let jsonMP ={
items:[
  {
    title:"Pasteleria Dulce",
    description: "Compra de Pasteles",
    category_id:"Pasteles",
    quantity:1,
    currency_id:"CLP",
    unit_price: JSON.parse(totalSuma),
  },
],
};

 async function llamarDatos() {
let data= await fetch("https://api.mercadopago.com/checkout/preferences",{
  method: "POST",
  headers: {
    "Authorization": "Bearer TEST-6722338042977296-051116-4bf280772964af7f11114b0ebc42a9fa-203277496"
  },
  body: JSON.stringify(jsonMP),
});
  let respondseMP= await data.json();
  location.href= respondseMP.init_point
  }
