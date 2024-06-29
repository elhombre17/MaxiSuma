const $opciones = document.getElementById('opciones'),
      $importe = document.getElementById('input');

let importe;
$importe.addEventListener('input', function(e){
    importe = e.target.value
})
$opciones.addEventListener('click', function(e){
    if(importe != null){
        switch (e.target.id) {
            case "ypf":
            
            console.log(`Importe: ${importe} en aplicacion ${e.target.id}`);
                break;
            case "mp":
                console.log("hiciste click en mp");
                break;
            case "remito":
                console.log("hiciste click en remito");
                break;
            case "ruta":
                console.log("hiciste click en ruta");
                break;
            case "vale":
                console.log("hiciste click en vale");
                break;
            default:
                break;
        }
        importe = null;
        $importe.value = "";
    }else{
        appendAlert('Nice, you triggered this alert message!', 'success')
    }
})
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible mt-3" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

let info={
    "id": 0,
    "nombre": "karin"
}

localStorage.setItem('data', JSON.stringify(info));

// Leer el JSON existente del localStorage
let data = localStorage.getItem('data');

console.log(data);
// Nueva información a agregar
const nuevaInformacion = { "id": 1, "nombre": "Ejemplo" };

// Agregar nueva información a la lista
let infooo = {...data, ...nuevaInformacion}

// Guardar el JSON actualizado en el localStorage
localStorage.setItem('data', JSON.stringify(infooo));

console.log("Información agregada exitosamente.");
console.log(data);