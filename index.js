//Inicio de variable importe
let importe; 
//Pagina de index.html
document.addEventListener('DOMContentLoaded', ()=>{
    const $opciones = document.getElementById('opciones'),
      $importe = document.getElementById('input'),
      $alertPlaceholder = document.getElementById('liveAlertPlaceholder'),
      $confirmPlaceholder = document.getElementById('confirmacion'),
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
            const fecha = new Date();
            let nuevoItem = {
                "fecha": fecha.toLocaleString(),
                "importe": Number(importe),
                "check": false,
            }
            getItems.push(nuevoItem);
            localStorage.setItem(`${e.target.id}`, JSON.stringify(getItems));
            const verItems = JSON.parse(localStorage.getItem(`${e.target.id}`));
            console.log(verItems);
            appendConfirm(`Se cargo el monto: ${importe} mediante ${e.target.id}`, 'success' );
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


//Funcion de alert de confirmacion de ingreso exitoso del item
    const appendConfirm= (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible mt-3" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" id="cerrarconfirm" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
        ].join('')

        $confirmPlaceholder.append(wrapper) 
        }
})



//Pagina de cierre.html
let sumatotal = 0; 
let sumaposnet = 0;
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
        sumatotal = sumatotal + ypfTotal;
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
            sumatotal = sumatotal + mpTotal;
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
            sumatotal = sumatotal + remitosTotal;
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
            sumatotal = sumatotal + rutaTotal;
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
            sumatotal = sumatotal + valeTotal;
            $vale.textContent = ` ${valeTotal}`; 
        }
    }

     //Suma posnet card
     $card = document.getElementById('totalcard')
     if($card){
         const getCard = JSON.parse(localStorage.getItem("card"));
         if(getCard!=null){
             let cardTotal = 0; 
             getCard.forEach(element => {
                 cardTotal = cardTotal + element.importe
             });
             sumaposnet = sumaposnet + cardTotal;
             sumatotal = sumatotal + cardTotal;
             $card.textContent = ` ${cardTotal}`; 
         }
     }
     //Suma posnet qr
     $qr = document.getElementById('totalqr')
     if($qr){
         const getQr = JSON.parse(localStorage.getItem("qr"));
         if(getQr!=null){
             let qrTotal = 0; 
             getQr.forEach(element => {
                 qrTotal = qrTotal + element.importe
             });
             sumaposnet = sumaposnet + qrTotal;
             sumatotal = sumatotal + qrTotal;
             $qr.textContent = ` ${qrTotal}`; 
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
                //ingresar informacion al body de POSNET TARJETA
                case "btnaccard":
                    const getCard = JSON.parse(localStorage.getItem("card"));
                    if(getCard!=null){
                        getCard.forEach(element => {
                            const newElement = document.createElement('li');
                            newElement.textContent = "  $" + `${element.importe}` + "  -    " + `${element.fecha}`;
                            fragment.appendChild(newElement);
                        });
                        document.getElementById('cardbody').appendChild(fragment);
                    }
                    break;
                //ingresar informacion al body de POSNET TARJETA
                case "btnacqr":
                    const getQr = JSON.parse(localStorage.getItem("qr"));
                    if(getQr!=null){
                        getQr.forEach(element => {
                            const newElement = document.createElement('li');
                            newElement.textContent = "  $" + `${element.importe}` + "  -    " + `${element.fecha}`;
                            fragment.appendChild(newElement);
                        });
                        document.getElementById('qrbody').appendChild(fragment);
                    }
                    break;
                default:
                    break;
            }
        })
    }
    //Alert suma tarjeta
    const $alertSumaPosnet= document.getElementById('sumaposnet');
    $alertSumaPosnet.textContent = "Total Posnet: "+ `${sumaposnet}`;

    //Alert suma total
    const $alertSumaTotal = document.getElementById('sumatotal');
    $alertSumaTotal.textContent = "TOTAL: "+ `${sumatotal}`; 

    //Boton borrar
    const $borrarcaja = document.getElementById('borrarcaja');
    $borrarcaja.addEventListener('click', ()=>{
        if(confirm("¿Seguro que desea borrar los datos de la caja?")){
            if(confirm("¿Seguro?")){
                localStorage.clear();
                alert("Felicidades! Inicio una nueva caja.");
                location.reload();
            }
        }  
    })
})

