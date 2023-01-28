window.onload = inicio;
function inicio() {
    document.formulario.onsubmit = validarFormulario;
    document.formulario.codigo_postal.oninput = cambioCodPos;



}


function validarFormulario() {

    let mensaje = "";
    let enviar = true;

    mensaje += validarRazon();
    mensaje += validarDni_Cif();
    mensaje += validarCodEmp();
    mensaje += validarDirec();
    mensaje += validLocalidad();
    mensaje += validarTelefono();
    mensaje += numerosPositive();
    mensaje += validFecha();
    mensaje += botonSelect();
    mensaje += validarOpction();
    mensaje += validarNumeroCuenta();
    mensaje += validCodControl();
    mensaje += validarIban();
    mensaje += controlCodBanco();
    mensaje += validCodPos();
    mensaje += validarDesplegable();
    if (mensaje.length > 0) {
        alert(mensaje);
        enviar = false;
    }

    return enviar;

}

// ----_-----FUNCIONES--------___-----------
function validarDni_Cif() {

    let nif = document.formulario.cif_nif.value.toUpperCase();
    //alert(nif);

    let validacionNif = nif_Cif(nif);
    //alert(validacionNif);//aqui mostramos en un alert el dni pasado
    return validacionNif;
}

function validarCodEmp() {
    let cadena_errores = "";
    let codigo_empresa = document.formulario.codigo_empresa.value;
    let codigo_emp = codigo_empresa.toLowerCase().trim();
    //let valido = true;
    if (codigo_emp.length < 5 || codigo_emp.length > 10) {
        //document.getElementById("codigo_empresa").style.borderColor = "red";
        //valido = false;
        cadena_errores += "En codigo empleado Error la longitud no es correcta,debe de ser entre 5 y 10 \n";
    }
    // if (codigo_emp.charAt(0) < "a" || codigo_emp.charAt(0) > "z") {
    //     //valido = false;
    //     cadena_errores += "Error el primer caracter debe de ser letra \n";
    // }
    //return valido;
    return cadena_errores;
}

function validarRazon() {


    let cadena_errores = "";
    let razon = document.formulario.razon.value.toUpperCase();


    if (razon.charAt(0) >= "A" && razon.charAt(0) <= "Z") {
    } else {
        cadena_errores += "En validar razón, Error el primer caracter es incorreecto, debe ser una letra \n";
        //alert("Error el primer caracter es incorreecto");
        // validado = false;
    }
    if ((razon.substr(-1) >= "A" && razon.substr(-1) <= "Z") || razon.substr(-1) == "." || !isNaN(razon.substr(-1))) {
    } else {
        cadena_errores += "En validar razón, Error el ultimo caracter es incorreecto \n";
        // alert("Error el ultimo caracter es incorreecto");
        // validado = false;

    }

    for (let i = 1; i < razon.length - 2; i++) {

        if (!(razon.charAt(i) >= "A" && razon.charAt(i) <= "Z") || razon[i] == "ª" || razon[i] == "º" || razon[i] == "-" || razon[i] == "." || !isNaN(razon[i])) {
            cadena_errores += "En validar razón,Error hay un caracter incorrecto en el nombre \n";
            // alert("Error");
            // validado = false;

        }
    }

    return cadena_errores;
}

function validarDirec() {
    let cadena_errores = "";
    let direcc = document.formulario.direccion.value;

    //let valido = true;
    let caracteres = "ºª-/. ";
    let enmedio = direcc.substr(1, direcc.length - 2);
    console.log(enmedio);
    if (!esLetra(direcc.charAt(0))) {
        //valido = false;
        cadena_errores += "Error el primer caracter debe de ser una letra \n";
    } else if (!esLetra(direcc.charAt(direcc.length - 1)) && !esNumero(direcc.charAt(direcc.length - 1))) {
        cadena_errores += "Error el último caracter debe de ser una letra o un número \n";
    } else {
        for (let i = 0; i < enmedio.length; i++) {
            if (!esLetra(enmedio[i]) && !esNumero(enmedio[i]) && !caracteres.includes(enmedio[i])) {
                cadena_errores += "Error deben de ser caracteres permitidos \n";
            }

        }
    }

    //return valido;
    return cadena_errores;

}
//console.log(validarDirec("alle44"));
function esLetra(str) {
    const letras = "abcdefghijklmnñopqrstuvwxyzáéíóúü ";
    str = str.toLowerCase();
    for (let i = 0; i < str.length; i++) {
        if (!(letras.includes(str[i]))) {
            return false;
        }
    }
    return true;
}
function esNumero(numero) {
    if (numero.charCodeAt(0) < "0".charCodeAt(0) || numero.charCodeAt(0) > "9".charCodeAt(0)) {
        return false;
    }
    return true;
}

function validLocalidad() {
    let cadena_errores = "";
    let local = document.formulario.codigo.value;
    let localidad = local.toLowerCase().trim();
    //let valido = true;
    let resto = localidad.substr(1, localidad.length - 2);
    let caracter = "áéíóúüñ ";
    if (!esLetra(localidad.charAt(0)) || !esLetra(localidad.charAt(localidad.length - 1))) {
        //valido = false;
        cadena_errores += "Error el primer  y ultimo caracter debe de ser una letra \n";
    } else {
        for (let i = 0; i < resto.length; i++) {
            if (!esLetra(resto[i]) && !caracter.includes(resto[i])) {
                cadena_errores += "Error los caracteres deben de ser letras, se permite espacios\n";
            }
        }
    }

    //return valido;
    return cadena_errores;
}
//console.log(validLocalidad("comunidad4 d6 madrid"));

function validCodPos() {

    let errores = "";
    let codPos = document.formulario.codigo_postal.value;
    let cp = parseInt(codPos);
    console.log(cp);
    if (cp < 1000 || cp > 52999 || codPos.length == 0 || codPos.length > 5) {
        let mensajeError = "El codigo postal no es correcto";
        document.formulario.provincia.value = mensajeError;
        errores = mensajeError;

    }
    return errores;
}

function cambioCodPos() {

    let cadena_errores = validCodPos();
    if (validCodPos().length > 0) {
        console.log("no es valido");
        return cadena_errores += "El CP puede tener valores comprendidos entre 1000 y 52999\n";

    } else {
        let codigoPostal = document.formulario.codigo_postal.value;
        let initial;
        if (codigoPostal.length == 4) {
            initial = parseInt(codigoPostal.substring(0, 1) - 1);
        } else {
            initial = parseInt(codigoPostal.substring(0, 2) - 1);
        }
        let provincias = ['Alava', 'Albacete', 'Alicante', 'Almería', 'Avila', 'Badajoz', 'Islas Baleares', 'Barcelona', 'Burgos', 'Cáceres',
            'Cádiz', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
            'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'León', 'Lérida', 'La Rioja', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
            'Orense', 'Asturias', 'Palencia', 'Las Palmas', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Cantabria', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
            'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza', 'Ceuta', 'Melilla'];

        document.formulario.provincia.value = provincias[initial];
        //console.log(" es valido");   
    }

}
// 
function validarTelefono() {
    let cadena_errores = "";
    let telefono = document.formulario.telefono.value;
    if (telefono.length != 9 && (telefono.charAt(0) != "6" || telefono.charAt(0) != "9" || telefono.charAt(0) != "7")) {
        cadena_errores += "Error, el teléfono debe contener 9 números y debe empezar por 6,9 ó 7 \n";

    }
    return cadena_errores;
}

function numerosPositive() {
    let cadena_errores = "";
    let camposPositivos = [document.formulario.telefono.value, document.formulario.codigo_postal.value];

    for (let i = 0; i < camposPositivos.length; i++) {
        if (parseInt(camposPositivos[i]) < 0) {
            cadena_errores += "Error,no se pueden introducir números negativos \n";
        }

    }
    return cadena_errores;
}

function validFecha() {

    let cadena_errores = "";
    let fecha = document.formulario.fechac.value;
    var fechaf = fecha.split("/");
    var day = fechaf[0];
    var month = fechaf[1];
    var year = fechaf[2];
    if (!(day.length == 2 || day.length == 1) || !(month.length == 2 || month.length == 1) || !(year.length == 4 || year.length == 2)) {
        cadena_errores += "En campo fecha,Error,los días tienen que ser entre 1 o 2 numeros al igual que los meses, el año debe contener 2 o 4 números\n";
    }
    return cadena_errores;
}



function iterateOverRadioGroups(listOfRadioButtons) {
    for (var i = 0; i < listOfRadioButtons.length; i++) {
        if (listOfRadioButtons[i].checked) {
            return true;
        }
    }
    return false;
}


function botonSelect() {
    let cadena_errores = "";
    let radio = document.formulario.radios;
    let sector = document.formulario.sector;
    let tipo = document.formulario.tipo;
    if (!iterateOverRadioGroups(radio)) {
        cadena_errores += "No has seleccionado personal\n ";
    }
    if (!iterateOverRadioGroups(sector)) {
        cadena_errores += "No has seleccionado sector\n ";
    }
    if (!iterateOverRadioGroups(tipo)) {
        cadena_errores += "No has seleccionado tipo\n ";

    }
    return cadena_errores;
}
/*El código del banco, el código de la oficina han de ser números y con cuatro
dígitos. */
function controlCodBanco() {
    let cadena_errores = "";
    let banco = document.formulario.codigo_banco.value;
    let oficina = document.formulario.codigo_oficina.value;
    if (parseInt(banco) != 4) {
        cadena_errores += "El banco debe de ser de 4 dígitos\n ";
    }
    if (parseInt(oficina) != 4) {
        cadena_errores += "La oficina debe de ser de 4 dígitos\n ";
    }
    return cadena_errores;
}

function validarOpction() {
    contador = 0;
    let cadena_errores = "";
    let comunidades = document.formulario.comunidades.options;
    // console.log(comunidades[0].text);

    for (let i = 0; i < comunidades.length; i++) {
        if (comunidades[i].selected) {
            contador++;
        }
    }
    if (contador < 2) {
        cadena_errores += "Error, debe seleccionar al menos dos comunidades \n";
    }
    console.log(contador);
    return cadena_errores;
}

function validarNumeroCuenta() {
    let cadena_errores = "";
    let numeroCuenta = document.formulario.numero_cuenta.value;
    if (numeroCuenta.length != 10 || isNaN(numeroCuenta)) {
        cadena_errores += "Error, el número de cuenta debe tener 10 números y no contener ningún carácter no numérico \n";
    }
    return cadena_errores;
}

function validCodControl() {
    let cadena_errores = "";
    let banco = document.formulario.codigo_banco.value;
    let oficina = document.formulario.codigo_oficina.value;
    let cuenta = document.formulario.numero_cuenta.value;
    let codigoForm = document.formulario.codigo_control.value;
    if (codigoForm != codigosControl(banco, oficina, cuenta)) {
        return cadena_errores += "El codigo de control no es correcto. \n";
    }

}
/*El IBAN va a empezar por dos letras y el resto van a ser dígitos y debe ser un
IBAN correcto, para ello usaremos la función que acabamos de crear. Y además
deberemos comprobar que el IBAN se corresponde con los datos anteriores. */
function validarIban() {
    let cadena_errores = "";
    let ibanD = document.formulario.iban.value;
    let iban = ibanD.toUpperCase();
    console.log(iban.charAt(0));
    if ((iban.charAt(0) < "A" || iban.charAt(0) > "Z") || (iban.charAt(1) < "A" || iban.charAt(1) > "Z")) {
        cadena_errores += "Error: el código IBAN debe empezar por dos letras. \n";
    }
    if (isNaN(iban.substring(2, iban.length))) {
        cadena_errores += "Error: los siguientes caracteres del iban deben de ser numeros \n";
    }
    console.log(iban);
    if (!comprobar_IBAN(iban)) {
        cadena_errores += "El IBAN introducido no es correcto\n";
    }

    return cadena_errores;

}

function validarDesplegable() {
    let cadena_errores = "";
    let indice = document.formulario.comunidades.options;
    let counter = 0;
    
    for (let i = 0; i < indice.length; i++) {
        
        if (indice[i].selected) {
            console.log("----"+i);
            counter++;
        }
    }
    if (counter < 2) cadena_errores = "tiene que seleccionar al menos dos comunidades";
    return cadena_errores;

}

