//fincion nif -----------------> katy
function esNif(cadenaNif) {

    let regexp = /[0-9]{8}[A-Z]{1}$/i;
    let regexp2 = /^[XYZLKM][0-9]{7}[A-Z]$/i;
    if (!regexp.test(cadenaNif) && !regexp2.test(cadenaNif)) {
        return 0;
    } else {
        let calculoCaracterControl = cadenaNif.substr(0, 8);
        let cambio;
        if (calculoCaracterControl.charAt(0) === "Y") {
            cambio = calculoCaracterControl.replace("Y", "1");
        }
        else if (calculoCaracterControl.charAt(0) === "Z") {
            cambio = calculoCaracterControl.replace("Z", "2");
        } else if (calculoCaracterControl.charAt(0) === "X" || calculoCaracterControl.charAt(0) === 'K' ||
            calculoCaracterControl.charAt(0) === "L" || calculoCaracterControl.charAt(0) === "M") {
            let primeraLetra = calculoCaracterControl.charAt(0);
            cambio = calculoCaracterControl.replace(primeraLetra, "0");
        } else {
            cambio = calculoCaracterControl;
        }
        let arr;
        arr = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
        let posicion = 0;
        posicion = parseInt(cambio) % 23;
        if (cadenaNif.substr(-1) !== arr[posicion]) {
            //console.log("el nif no es correcto, el caracter de control es erroneo");
            return 2;
        }
        if (!cambio >= 100000) {
            //console.log("Se ha introducido un DNI, se ha pasado un número de entre 6 y 8 dígitos con un valor mínimo de 100000.");
            return 3;
        }
    }

    return 1;
}
//console.log(esNif("14011159M"));

//funcion cif ----------------------> katy
function esCif(cadenaCif) {

    let sumaPares = 0;
    let sumaImpares = 0;
    let regexp = /^[AHJUV][0-9]{8}$/i;
    let regexp2 = /^[PQRSW][0-9]{7}[A-Z]$/i;
    if (!regexp.test(cadenaCif) && !regexp2.test(cadenaCif)) {
        return 0; //no es valido ya que no cumple las expresiones regulares 
    } else {
        for (let i = 1; i < 8; i++) {
            if (i % 2 === 1) {
                //al introducir una cadena, es nesario realizar parseInt para las operaciones
                let num = parseInt(cadenaCif[i]) * 2;
                if (num > 9) {
                    //el num%10 me va a dar el primer digito
                    //el ultimo numero siempre sera 1
                    sumaImpares += 1 + num % 10;
                } else {
                    sumaImpares += num;
                }
            } else {
                sumaPares += parseInt(cadenaCif[i]);
            }
        }
        //calculamos el resultado final realizando la suma de pares e impares, el modulo del mismo y restamos 10
        let resultado = 10 - ((sumaImpares + sumaPares) % 10);
        if (resultado === 10) {
            resultado = 0;
        }
        //segun el formato que sea modificamos la ultima letra de la cadena o bien segun el resultado será una letra 
        if (regexp.test(cadenaCif)) {
            //formato1.includes(cadenaCif[0])
            if (resultado === cadenaCif[8]) {
                return 1; //cif correcto
            }
        }
        if (regexp2.test(cadenaCif)) {
            let arr;
            arr = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
            if (cadenaCif[8] === arr[resultado]) {
                return 1;
            }
        }
    }
    return 2; //cif erroneo o caracter de control erroneo
}
console.log(esCif("14011159M"));

//funcion nif cif juntos -------------------------> katy
function nif_Cif(cadena){
    let n2 = "Se ha introducido un NIF erróneo.El carácter de control es erróneo ";
    let n1="Se ha introducido un NIF correcto";
    let n3="Se ha introducido un DNI,se ha pasado un número de entre 6 y 8 dígitos con un valor mínimo de 100000 ";
    let c1="Se ha introducido un CIF correcto ";
    let c2="Se ha introducido un cif erróneo.El carácter de control es erróneo ";
    if(esNif(cadena)=== 2){
        return n2;
    }else if(esNif(cadena)===3){
        return n3;
    }else if(esNif(cadena)===1){
        return n1;
    }
    if(esCif(cadena)===0){
        return 0;
    }else if(esCif(cadena)===2){
        return c2;
    }else{
        return c1;
    }  
}

//console.log(nif_Cif("V31261"));
//funcion codigos de control -----------------> JHON
function codigosControl(codBanco, numSucursal, numCuenta) {
    
    if (codBanco.length === 4 && numSucursal.length === 4 && numCuenta.length === 10 && isNaN(codBanco) === false && isNaN(numSucursal) === false && isNaN(numCuenta) === false) {
        // console.log(codBanco);
        // console.log(isNaN(codBanco));
        //-----------------Calcular numero1----------------------------------------------
        let numero1 = 0; //tipo number
        numero1 = parseInt(codBanco[0]) * 4 + parseInt(codBanco[1]) * 8 + parseInt(codBanco[2]) * 5 + parseInt(codBanco[3]) * 10;
        //console.log(numero1);
        //-----------------Calcular numero2----------------------------------------------
        let numero2 = 0;
        numero2 = parseInt(numSucursal[0]) * 9 + parseInt(numSucursal[1]) * 7 + parseInt(numSucursal[2]) * 3 + parseInt(numSucursal[3]) * 6;
        //console.log(numero2);
        //Suma=numero1+numero2
        let sumaN1N2 = numero1 + numero2;
        //console.log(sumaN1N2);
        let resto1 = parseInt(sumaN1N2) % 11;
        //console.log("resto1= " + resto1); // correcto
        let valorObtenido1;

        valorObtenido1 = 11 - resto1;

        //console.log("valorObtenido1= " + valorObtenido1); // Correcto hasta aqui
        let carControl1;

        //console.log("length de valorObtenido1: " + valorObtenido1.toString().length);

        //Muy importante convertir a String si se aplica .length
        if (valorObtenido1.toString().length === 1) {
            carControl1 = valorObtenido1;
        } else {
            if (valorObtenido1 === 10) {
                carControl1 = 1;
            }
            if (valorObtenido1 === 11) {
                carControl1 = 0;
            }
        }
       
        //console.log("carControl1= " + carControl1);
        //-----------------Calcular numero3----------------------------------------------
        let numero3=0;
        //parseInt(numCuenta[0])*1
        numero3 = parseInt(numCuenta[0]) + parseInt(numCuenta[1]) * 2 + parseInt(numCuenta[2]) * 4 + parseInt(numCuenta[3]) * 8 + parseInt(numCuenta[4]) * 5 + parseInt(numCuenta[5]) * 10 + parseInt(numCuenta[6]) * 9 + parseInt(numCuenta[7]) * 7 + parseInt(numCuenta[8]) * 3 + parseInt(numCuenta[9]) * 6;
        let resto2 = numero3 % 11;
        //console.log("resto2= " + resto2);
        let valorObtenido2;
        valorObtenido2 = 11 - resto2;
        //console.log("valorObtenido2= " + valorObtenido2);

        let carControl2;
        if (valorObtenido2.toString().length === 1) {
            carControl2 = valorObtenido2;
        } else {
            if (valorObtenido2 === 10) {
                carControl2 = 1;
            }
            if (valorObtenido1 === 11) {
                carControl2 = 0;
            }
        }

        //console.log("carControl2= "+carControl2);
         // concateno con "" sino se suman los digitos de control
        return "" + carControl1 + carControl2;
    }
}
//console.log(codigosControl("0182","1329","7254097113"));
//01821329797254097113

//funcion calculoIbanEspaña -------------------------> cris
function calculoIBANEspanya(nCuenta){
 
  if(isNaN(nCuenta)){
      return false;
  }
  //Lo separo y le pongo el 142800 al final, opero con él
  let Numeros = nCuenta.split("");
  Numeros.push(142800);
  let nControl = BigInt(Numeros.join(""));
  nControl = nControl%BigInt(97);
  nControl = BigInt(98)-nControl;
  //Compruebo el resultado y lo devuelvo de forma correcta
  if(nControl<10){
      nControl="ES0"+nControl+nCuenta;
      return nControl;
  }else{
      nControl="ES"+nControl+nCuenta;
      return nControl;
  }
}



//funcion comprobarIban-----------------------------> cris 
function comprobarIBAN(iban){

  
  iban = iban.toUpperCase();

  let pattern = /([A-Za-z]{2}\d{2}[A-Za-z\d]{2,30})/;
  if (!pattern.test(iban)){
      return false;
  }

  iban = iban.split("");

  for (let i = 0; i < 4; i++){
      iban.push(iban.shift());
  }

  for (let i = 0; i < iban.length; i++){
      if (64 < iban[i].charCodeAt() && iban[i].charCodeAt() < 91){
          let transformedLetter = iban[i].charCodeAt() - 55;
          iban[i] = transformedLetter;
      } else {
          iban[i] = parseInt(iban[i]);
      }
  } 
  
  let valid = false;
  if (iban.length > 18) {
  const bigIban = BigInt(iban.join(""));
  if ( bigIban % 97n === 1n ) {
      valid = true;
  }
  }
  
  return valid;
}
