lo//Inicio de variables y constantes
const fecha = new Date();
let importe; 
//Pagina de index.html
document.addEventListener('DOMContentLoaded', ()=>{
    const $opciones = document.getElementById('opciones'),
      $importe = document.getElementById('input'),
      $alertPlaceholder = document.getElementById('liveAlertPlaceholder'),
      $cierre = document.getElementById('cierre');

//Captar el input del monto y ponerlo en una variable
if($importe){
    $importe.addEventListener('input', function(e){
        importe = e.target.value
    })
}
 
//Guardar en el localStorage cada uno de los montos especificados
if($opciones){
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
}
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
})

//Pagina de cierre.html
document.addEventListener('DOMContentLoaded', ()=>{
//Cargar informacion a la cabecera del acordeon
    //Suma YPF
    $ypf = document.getElementById('totalypf')
    if($ypf){
        const getYPF = JSON.parse(localStorage.getItem("ypf"));
        if(getYPF!=null){ 
        let ypfTotal = 0;
        getYPF.forEach(element => {
            ypfTotal = ypfTotal + element.importe
        });
        $ypf.textContent = ` ${ypfTotal}`;  
        }
    }

    //Suma MP
    $mp = document.getElementById('totalmp')
    if($mp){
        const getMP = JSON.parse(localStorage.getItem("mp"));
        if(getMP!=null){
            let mpTotal = 0; 
            getMP.forEach(element => {
                mpTotal = mpTotal + element.importe
            });
            $mp.textContent = ` ${mpTotal}`; 
        }
    }

    //Suma Remitos
    $remitos = document.getElementById('totalremitos')
    if($remitos){
        const getRemitos = JSON.parse(localStorage.getItem("remito"));
        if(getRemitos!=null){
            let remitosTotal = 0; 
            getRemitos.forEach(element => {
                remitosTotal = remitosTotal + element.importe
            });
            $remitos.textContent = ` ${remitosTotal}`; 
        }
    }

    //Suma Ruta
    $ruta = document.getElementById('totalruta')
    if($ruta){
        const getRuta = JSON.parse(localStorage.getItem("ruta"));
        if(getRuta!=null){
            let rutaTotal = 0; 
            getRuta.forEach(element => {
                rutaTotal = rutaTotal + element.importe
            });
            $ruta.textContent = ` ${rutaTotal}`; 
        }
    }

    //Suma Vale
    $vale = document.getElementById('totalvale')
    if($vale){
        const getVale = JSON.parse(localStorage.getItem("vale"));
        if(getVale!=null){
            let valeTotal = 0; 
            getVale.forEach(element => {
                valeTotal = valeTotal + element.importe
            });
            $vale.textContent = ` ${valeTotal}`; 
        }
    }

//Cargar informacion al body del acordion
    const $acordion = document.getElementById('accordionTotales');
    if($acordion){
        const fragment = document.createDocumentFragment();
        $acordion.addEventListener('click', (e)=>{
            switch (e.target.id) {
                //ingresar informacion al body de YPF
                case "btnacypf":
                    const getYPF = JSON.parse(localStorage.getItem("ypf"));
                    if(getYPF!=null){
                        getYPF.forEach(element => {
                            const newElement = document.createElement('li');
                            newElement.textContent = "  $" + `${element.importe}` + "  -    " + `${element.fecha}`;
                            fragment.appendChild(newElement);
                        });
                        document.getElementById('ypfbody').appendChild(fragment);
                    }
                    break;
                //ingresar informacion al body de MP   
                case "btnacmp":
                    const getMP = JSON.parse(localStorage.getItem("mp"));
                    if(getMP!=null){
                        getMP.forEach(element => {
                            const newElement = document.createElement('li');
                            newElement.textContent = "  $" + `${element.importe}` + "  -    " + `${element.fecha}`;
                            fragment.appendChild(newElement);
                        });
                        document.getElementById('mpbody').appendChild(fragment);
                    }
                    break;
                //ingresar informacion al body de REMITOS  
                case "btnacremitos":
                    const getRemitos = JSON.parse(localStorage.getItem("remito"));
                    if(getRemitos!=null){
                        getRemitos.forEach(element => {
                            const newElement = document.createElement('li');
                            newElement.textContent = "  $" + `${element.importe}` + "  -    " + `${element.fecha}`;
                            fragment.appendChild(newElement);
                        });
                        document.getElementById('remitosbody').appendChild(fragment);
                    }
                    break;
                //ingresar informacion al body de YPF EN RUTA
                case "btnacruta":
                    const getRuta = JSON.parse(localStorage.getItem("ruta"));
                    if(getRuta!=null){
                        getRuta.forEach(element => {
                            const newElement = document.createElement('li');
                            newElement.textContent = "  $" + `${element.importe}` + "  -    " + `${element.fecha}`;
                            fragment.appendChild(newElement);
                        });
                        document.getElementById('rutabody').appendChild(fragment);
                    }
                    break;
                //ingresar informacion al body de VALES
                case "btnacvales":
                    const getVale = JSON.parse(localStorage.getItem("vale"));
                    if(getVale!=null){
                        getVale.forEach(element => {
                            const newElement = document.createElement('li');
                            newElement.textContent = "  $" + `${element.importe}` + "  -    " + `${element.fecha}`;
                            fragment.appendChild(newElement);
                        });
                        document.getElementById('valesbody').appendChild(fragment);
                    }
                    break;
                default:
                    break;
            }
        })
    }
    //Boton borrar
$borrarCaja = document.getElementById('borrarCaja');
$borrarCaja.document.addEventListener('click', ()=>{ 
localStorage.clear();
}
})


