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
        alert("No ingresaste un monto")
    }
})
