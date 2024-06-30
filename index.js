//Inicio de variables y constantes
const $opciones = document.getElementById('opciones'),
      $importe = document.getElementById('input'),
      $alertPlaceholder = document.getElementById('liveAlertPlaceholder'),
      fecha = new Date();
let importe; 

//Captar el input del monto y ponerlo en una variable
$importe.addEventListener('input', function(e){
    importe = e.target.value
})
 
//Guardar en el localStorage cada uno de los montos especificados
$opciones.addEventListener('click', function(e){
    if(importe != null){
        let getItems = JSON.parse(localStorage.getItem(`${e.target.id}`));
        if(getItems == null){
            getItems = [];
        }
        let nuevoItem = {
            "fecha": fecha.toLocaleString(),
            "importe": Number(importe),
            "check": false,
        }
        getItems.push(nuevoItem);
        localStorage.setItem(`${e.target.id}`, JSON.stringify(getItems));
        const verItems = JSON.parse(localStorage.getItem(`${e.target.id}`));
        console.log(verItems);
        importe = null;
        $importe.value = "";
    }else{
        appendAlert('Por favor, antes de seleccionar una opcion, ingrese el monto', 'danger')
    }
})

//Funcion de alert por querer insertar un metodo de pago sin especificar el monto
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible mt-3" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  $alertPlaceholder.append(wrapper)
}

//Cargar informacion a la tabla de cierre de caja
