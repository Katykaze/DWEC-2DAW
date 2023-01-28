if (document.addEventListener) {
    window.addEventListener("load", inicio);
} else if (document.attachEvent) {
    window.attachEvent("onload", inicio);
}


document.attachEvent = undefined;

function inicio() {

    let formulario = document.getElementById("formulario");
    let cambioCP = document.getElementById("codpostal");
    let cajatelfn = document.getElementById("telefono");
    let cajacp = document.getElementById("codpostal");
    let cajabanco = document.getElementById("codbanco");
    let cajaoficina = document.getElementById("codoficina");
    let cajacontrol = document.getElementById("codcontrol");
    let cajacuenta = document.getElementById("numcuenta");
    let cajatrabajadores = document.getElementById("numtrabajadores");
    let cajafabricas = document.getElementById("numfabrica");
    //foreach y array para los elementos que incluyen evento de control de digitos
    let arr=[cajatelfn,cajacp,cajabanco,cajaoficina,cajacontrol,cajacuenta,cajatrabajadores,cajafabricas];
    if (document.addEventListener) {
        formulario.addEventListener("submit", validForm);
        cambioCP.addEventListener("input",cambioCodPos);
        //clean.addEventListener("onreset",limpiar);
        arr.forEach(element => element.addEventListener("keypress",soloDigitos));
    } else if (document.attachEvent) {
        cambioCP.attachEvent("oninput",cambioCodPos);
        formulario.attachEvent("onsubmit", validForm);
        arr.forEach(element => element.attachEvent("onkeypress",soloDigitos));
    }
}

function soloDigitos(event) {
    //let evento = event || window.event;
    let valido = true;
    let valor = String.fromCharCode(event.charCode);
    if (valor < "0" || valor > "9") {
        event.preventDefault();
        valido = false;
    }
    return valido;
}

function validForm(evento) {
    let valido = true;
    valido = validarRazon() && valido;
    valido = validarCodigoEmpresa() && valido;
    valido = validNif_Cif() && valido;
    valido = botonesSelect() && valido;
    valido = validarDesplegable() && valido;
    valido= validarChecBox() && valido;
    valido=validar_direccion() && valido;
    valido=validar_localidad()&&valido;
    valido= validar_codPostal()&&valido;
    valido=validarCodControl()&&valido;
    valido=validarNumCuenta()&&valido;
    valido=validarNumTrabajadores()&&valido;
    valido=validarNumFabrica()&&valido;
    valido=validarTelefono()&&valido;
    valido=validarFecha()&&valido;
    valido=validarCodBanco()&&valido;
    valido=validarCodOficina()&&valido;
    valido=validarIban()&&valido;
    if (!valido) {
        evento.preventDefault();
    }
}

//validacion de razon social
function validarRazon() {
    let valido = true;
    let razonF = document.getElementById("nombre").value;
    let regExp = /^[a-zA-ZñÑáéíóúü][a-zA-ZñÑºªáéíóúü\-\.0-9 ]*[a-zA-ZñÑáéíóúü\.0-9]$/;
    if (!regExp.test(razonF)) {
        valido = false;
        //console.log('error en razon ');
        document.getElementById("error_razon").value = "Error. Debe empezar por una letra y terminar por letra dígito o punto. En su interior puede contener letras, dígitos y caracteres º ª - .";
        // mostrarError("error_razon");
        document.querySelector("#error_razon").style.visibility = 'visible';

    } else {
        document.querySelector("#error_razon").style.visibility = 'hidden';
        // ocultarError("error_razon");
    }
    console.log(valido);
    return valido;
}

//validacion codigo de la empresa
function validarCodigoEmpresa() {
    let valido = true;
    let valorDelCampo = document.getElementById("codempresa").value;
    let regExp = /^[a-zA-ZñÑ0-9]{5,10}$/;
    if (!regExp.test(valorDelCampo)) {
        valido = false;
        document.getElementById("error_codempresa").value = "Error. Debe contener letra o dígitos.Tamaño comprendido entre 5 y 10";
        document.querySelector("#error_codempresa").style.visibility = 'visible';
    } else {
        document.querySelector("#error_codempresa").style.visibility = 'hidden';
    }
    return valido;
}

//validacion de si nifcif es correcto
function validNif_Cif() {
    let n2 = "Se ha introducido un NIF erróneo.El carácter de control es erróneo ";
    let n3 = "Se ha introducido un DNI,se ha pasado un número de entre 6 y 8 dígitos con un valor mínimo de 100000 ";
    let c2 = "Se ha introducido un cif erróneo.El carácter de control es erróneo ";
    let valido = true;
    let cifNif = document.getElementById("cifnif").value;
    let resultado = nif_Cif(cifNif);
    console.log(resultado);
    if (resultado === n2 || resultado === n3 || resultado === c2 || resultado === 0) {
        document.getElementById("error_nifcif").value = "Error,el nif  o cif no es correcto";
        document.querySelector("#error_nifcif").style.visibility = "visible";
        valido = false;
    } else {
        document.querySelector("#error_nifcif").style.visibility = "hidden";
    }
    return valido;
}

function botonesSelect() {
    let valido = true;
    /*let radio = document.querySelector('input[name="tipopersona"]:checked').value;//nos devuelve el valor
    let tipo = document.querySelector('input[name="tipo"]:checked').value;//nos devuelve un nodo con todos los tipos*/
    let tiposradio = document.getElementsByName("tipopersona");
    let radioActivo = null;
    let empradio = document.getElementsByName("tipo");
    let empActivo = null;
    for (let i = 0; i < tiposradio.length; i++) {
        if (tiposradio[i].checked === true) {
            radioActivo = tiposradio[i].value;
        }
    }
    for (let i = 0; i < empradio.length; i++) {
        if (empradio[i].checked === true) {
            empActivo = empradio[i].value;
        }
    }
    if (radioActivo == null) {
        valido = false;
        document.getElementById("error_tipo").value = "Error,debes elegir un tipo de empresa";
        document.querySelector("#error_tipo").style.visibility = "visible";

    } else {
        document.querySelector("#error_tipo").style.visibility = "hidden";
    }

    if (empActivo == null) {
        valido = false;
        document.getElementById("error_tipoemp").value = "Error,debes elegir un tipo de empresa";
        document.querySelector("#error_tipoemp").style.visibility = "visible";


    } else {
        document.querySelector("#error_tipoemp").style.visibility = "hidden";
    }

    return valido;
}

//controlar en el apartado comunidades elegir minimo dos campos
function validarDesplegable() {
    let valido = true;
    let indice = document.getElementsByName("comunidades")//nos devuelve un array con todas las opciones
    if (indice.selectedIndex == null || indice.selectedIndex === 0 || indice.selectedIndex < 2) {
        document.getElementById("error_comunidad").value = "Error,debes elegir al menos dos comunidades";
        document.querySelector('#error_comunidad').style.visibility = 'visible';
        valido = false;
    } else {
        document.querySelector('#error_comunidad').style.visibility = 'hidden';
    }
    return valido;
}
function validarChecBox() {
    let valido = true;
    let check = document.querySelectorAll('input[type="checkbox"]:checked');
    if (check.length < 1) {
        document.formulario.error_sectores.value = "Error, debe elegir al menos una opcion";
        document.formulario.error_sectores.style = "visibility: visible";
        valido = false;
    } else {
        document.formulario.error_sectores.style = "visibility: hidden";
    }
    return valido;
}
function validar_direccion() {
    let valido = true;
    let dir = document.getElementById("direccion").value;
    let expregdir = /^[a-zA-ZñÑáéíóúü][a-zA-ZñÑºªáéíóúü\-\.0-9 ]*[a-zA-ZñÑáéíóúü0-9]$/i;
    if (!expregdir.test(dir)) {
        valido=false;
        document.getElementById("error_direccion").value = "Error, la direccion está mal escrita";
        document.querySelector("#error_direccion").style.visibility = "visible";
    }
    else {
        document.querySelector("#error_direccion").style.visibility = "hidden";
    }
    return valido;
}
function validar_localidad() {
    let valido = true;
    let expregloc = /^[a-z]([a-z]|\s)+[a-z]$/i;
    let localidad = document.getElementById("localidad").value;
    if (!expregloc.test(localidad)) {
        document.getElementById("error_localidad").value = "Error, la localidad está mal escrita";
        document.querySelector("#error_localidad").style.visibility = "visible";
    } else {
        document.querySelector("#error_localidad").style.visibility = "hidden";
    }
    return valido;
}
//validar codigo postal
function validar_codPostal() {
    let valido = true;
    let codpostal = document.getElementById("codpostal").value;
    let expregcodpos = /^([1-4]\d{4}|5[0-2]\d{3}|0?100\d|0?10[1-9]\d|0?1[1-9]\d{2}|0?[2-9]\d{3})$/i
    if (!expregcodpos.test(codpostal)) {
        valido = false;
        document.getElementById("error_codpos").value = "Error, codigo postal no valido";
        document.querySelector("#error_codpos").style.visibility = "visible";
    } else {
        document.querySelector("#error_codpos").style.visibility= "hidden";
    }
    return valido;
}
function cambioCodPos() {
    //let evento = event || window.event;
    if (validar_codPostal()) {
        let codigoPostal = document.getElementById("codpostal").value;
        let initial;
        if (codigoPostal.length === 4) {
            initial = parseInt(codigoPostal.substring(0, 1) - 1);
        } else if(codigoPostal.length === 5) {
            initial = parseInt(codigoPostal.substring(0, 2) - 1);
        }
        console.log(initial);
        let provincias = ['Alava', 'Albacete', 'Alicante', 'Almería', 'Avila', 'Badajoz', 'Islas Baleares', 'Barcelona', 'Burgos', 'Cáceres',
            'Cádiz', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
            'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'León', 'Lérida', 'La Rioja', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
            'Orense', 'Asturias', 'Palencia', 'Las Palmas', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Cantabria', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
            'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza', 'Ceuta', 'Melilla'];

        document.getElementById("provincia").value = provincias[initial];
        //console.log(" es valido");
    }else{
        document.getElementById("provincia").value = "-------------------";
        //evento.preventDefault();
    }

}
function validarCodControl() {
    let valido = true;
    let codControl = document.getElementById("codcontrol").value;
    let codBanco = document.getElementById("codbanco").value;
    let numCuenta = document.getElementById("numcuenta").value;
    let numSucursal = document.getElementById("codoficina").value;
    let expreCodControl = /^\d{2}$/;
    if (!expreCodControl.test(codControl) || codControl !== codigosControl(codBanco, numSucursal, numCuenta)) {
        document.getElementById("error_codcon").value = "Error, El código de control debe ser numérico con dos dígitos, y válido";
        document.querySelector("#error_codcon").style.visibility = "visible";
        valido = false;
    } else {
        document.querySelector("#error_codcon").style.visibility = "hidden";
    }
    return valido;
}
function validarNumCuenta() {
    let valido = true;
    let numCuenta = document.getElementById("numcuenta").value;
    let expreNumCuenta = /^\d{10}$/;
    if (!expreNumCuenta.test(numCuenta)) {
        document.querySelector("#error_numcu").value = "Error, El número de cuenta ha de ser numérico con 10 dígitos.";
        document.querySelector("#error_numcu").style.visibility = "visible";
        valido = false;
    } else {
        document.querySelector("#error_numcu").style.visibility = "visible";
    }
    return valido;
}
function validarNumTrabajadores() {
    let valido = true;
    let numTrabajadores = document.formulario.numtrabajadores.value;
    let expreNumTrabajadores = /^((0{0,4}4[5-9])|(0{0,4}[5-9]\d)|(0{0,3}[1-9]\d{2})|(0{0,2}[1-9]\d{3})|(0?[1-9]\d{4})|([1-9]\d{5}))$/;
    if (!expreNumTrabajadores.test(numTrabajadores)) {
        document.getElementById("error_numtrab").value = "Error, El valor mínimo va a ser 45 y puede tener hasta seis dígitos.";
        document.querySelector("#error_numtrab").style.visibility = "visible";
        valido = false;
    } else {
        document.querySelector("#error_numtrab").style.visibility = "hidden";
    }
    return valido;
}
function validarNumFabrica() {
    let valido = true;
    let numFabrica = document.getElementById("numfabrica").value;
    let expreNumFabrica = /^((0{0,3}[2-9])|(0{0,2}[1-9]\d)|(0{0,2}[1-9]\d{2})|(0?[1-9]\d{2})|([1-9]\d{3}))$/;
    if (!expreNumFabrica.test(numFabrica)) {
        document.getElementById("error_numfab").value = "Error, El valor mínimo va a ser 2 y tener hasta cuatro dígitos.";
        document.querySelector("#error_numfab").style.visibility = "visible";
        valido = false;
    } else {
        document.querySelector("#error_numfab").style.visibility = "visible";
    }
    return valido;
}
function validarTelefono() {
    let valido = true;
    let tel = document.getElementById("telefono").value;
    let regExptel = /^[6-9][0-9]{8}$/;

    if (!regExptel.test(tel)) {
        document.getElementById("error_telefono").value = "Error, Debe tener 9 dígitos y comenzar por 9,8,6 o 7.";
        document.querySelector("#error_telefono").style.visibility = "visible";
        valido = false;
    } else {
        document.querySelector("#error_telefono").style.visibility = "hidden";
    }
    return valido;
}
function validarFecha() {
    let valido = true;
    let fecha = document.getElementById("fecha").value;
    let regExpfecha = /^((31(\/|-|\.)(0?[13578]|1[02]))(\/|-|\.)|((29|30)(\/|-|\.)(0?[13-9]|1[0-2])\2))\d{4}$|^(29(\/|-|\.)0?2(\/|-|\.)((\d{2}(0[48]|[2468][048]|[13579][26])|(0[48]00)|(([2468][048]|[13579][26])00))))$|^(0?[1-9]|1\d|2[0-8])(\/|-|\.)((0?[1-9])|(1[0-2]))(\/|-|\.)(\d{4})$/;
    if (!regExpfecha.test(fecha)) {

        document.getElementById("error_fecha").value = "Error, La fecha es incorrecta. ";
        document.querySelector("#error_fecha").style.visibility = "visible";
        valido = false;
    } else {
        document.querySelector("#error_fecha").style.visibility = "hidden";
    }
    return valido;
}
function validarCodBanco() {
    let valido = true;
    let banco = document.getElementById("codbanco").value;
    let regExpbanco = /^\d{4}$/
    if (!regExpbanco.test(banco)) {
        document.getElementById("error_banco").value = "Error, El código de banco debe tener cuatro digitos.";
        document.querySelector("#error_banco").style.visibility = "visible";
        valido = false;
    } else {
        document.querySelector("#error_banco").style.visibility = "hidden";
    }
    return valido;
}
function validarCodOficina() {
    let valido = true;
    let ofi = document.getElementById("codoficina").value;
    let regExpofi = /^\d{4}$/
    if (!regExpofi.test(ofi)) {
        document.getElementById("error_oficina").value = "Error, El código de oficina debe tener cuatro digitos.";
        document.querySelector("#error_oficina").style.visibility = "visible";
        valido = false;
    } else {
        document.querySelector("#error_oficina").style.visibility = "hidden";
    }
    return valido;
}
function validarIban() {
    let valido = true;
    let iban = document.getElementById("iban").value;
    let regExpiban = /^([A-Za-z]{2}\d{2}[A-Za-z\d]{2,30})$/;
    if (!regExpiban.test(iban)) {
        document.getElementById("error_iban").value = "Error, Debe comenzar por dos letras, continuar con 2 digitos y el resto deben ser letras y digitos .";
        document.querySelector("#error_iban").style.visibility = "visible";
        valido = false;
    } else {
        document.querySelector("#error_iban").style.visibility = "hidden";
    }
    return valido;
}
/*Llamar a preventDefault en cualquier momento durante la ejecución, cancela el evento,
lo que significa que cualquier acción por defecto que deba producirse como resultado de
este evento, no ocurrirá.*/