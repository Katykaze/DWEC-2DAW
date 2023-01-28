if (document.addEventListener) {
    window.addEventListener("load", comienzo);
}
else if (document.attachEvent) {
    window.attachEvent("onload", comienzo);
}

function comienzo() {
    let botonRegistro = document.getElementById("registroPag");
    let botonEntrar = document.getElementById("entrarPag");
    //let botonCerrarSesion = document.getElementById("entrarPag");
    let botonAnadirDefinicion = document.getElementById("anadir_definicion");
    let botonAnadirLocalidad = document.getElementById("anadir_localidad");
    let botonAnadirCoche = document.getElementById("anadir_coche");
    let seleccionCA = document.getElementById("comunidades");
    let anadirMensaje = document.getElementById("anadir_mensaje");
    if (document.addEventListener) {
        botonRegistro.addEventListener("click", registrar);
        botonEntrar.addEventListener("click", entrar);
        botonAnadirDefinicion.addEventListener("click", insertDefinition);
        botonAnadirLocalidad.addEventListener("click", anadirLocalidad);
        botonAnadirCoche.addEventListener("click", anadirCoche);
        seleccionCA.addEventListener("change", seleccionarCA);
        seleccionCA.addEventListener("change", anadirComentarioComunidad);
        anadirMensaje.addEventListener("click", anadirMensajeChat);
    } else if (document.attachEvent) {
        botonRegistro.attachEvent("onclick", registrar);
        botonRegistro.attachEvent("onclick", entrar);
        //botonCerrarSesion.attachEvent("onclick", cerrarSesionn);
        botonAnadirDefinicion.attachEvent("onclick", insertDefinition);
        botonAnadirLocalidad.attachEvent("onclick", anadirLocalidad);
        botonAnadirCoche.attachEvent("onclick", anadirCoche);
        seleccionCA.attachEvent("onchange", seleccionarCA);
        seleccionCA.attachEvent("onchange", anadirComentarioComunidad);
        anadirMensaje.attachEvent("onclick", anadirMensajeChat);
    }
}
function registrar() {

    document.getElementById("dialogo2").show();
    let botonAceptar = document.getElementById("aceptar");
    let botonCancelar = document.getElementById("cancelar");
    if (document.addEventListener) {
        botonAceptar.addEventListener("click", validarRegistro);
        botonCancelar.addEventListener("click", cancelarDialogo2);
    } else if (document.attachEvent) {
        botonAceptar.attachEvent("onclick", validarRegistro);
        botonCancelar.attachEvent("onclick", cancelarDialogo2);
    }
}
//funcion para validar si usuario y contraseña cumplen las normas 
function validarRegistro() {
    let valido = true;
    let nombre = document.getElementById("nombre").value;
    let contrasena = document.getElementById("contrasena").value;
    let regexpNombre = /^[a-z]{3}[a-z\d]{5,9}$/i;
    let regexpContrasena = /^[a-z]{2}[\w\d]{5,11}[a-z\d]{1}$/;
    if (!regexpNombre.test(nombre) || !regexpContrasena.test(contrasena)) {
        valido = false;
        console.log("error en introduccion de credenciales");
    }
    if (valido) {
        //creamos una cookie 
        console.log(document.cookie = nombre + "=" + contrasena + "; expires=True, 30 Jan 2030 00:00:00 GMT");
    }
    document.getElementById("dialogo2").close();
    return valido;
}
//funcion para la opcion de cancelar 
function cancelarDialogo2() {
    document.getElementById("dialogo2").close();
}
function entrar() {
    document.getElementById("dialogo3").show();
    let botonAceptar = document.getElementById("aceptarUsu");
    let botonCancelar = document.getElementById("cancelarUsu");
    if (document.addEventListener) {
        botonAceptar.addEventListener("click", validar);
        botonCancelar.addEventListener("click", cancelar);
    } else if (document.attachEvent) {
        botonAceptar.attachEvent("onclick", validar);
        botonCancelar.attachEvent("onclick", cancelar);
    }

}
function validar() {

    let nombre = document.getElementById("nombreUsu").value;
    let contrasena = document.getElementById("contrasenaUsu").value;
    let cookies = document.cookie;
    // console.log(nombreUsu + " " + contrasenaUsu)

    if (cookies.length >= 0) {
        let usuarios = cookies.split(';');
        let credenciales = nombre + "=" + contrasena;
        let usuarioExiste = false;
        // let i = 0;
        // let longitudUsuarios = usuarios.length;
        if (usuarios.indexOf(credenciales) >= 0) {
            usuarioExiste = true;
        }
        // while (i < longitudUsuarios && !usuarioExiste) {
        //     //for(let i = 0; i < usuarios.length; i++){
        //     if (usuarios[i].trim() == credenciales) {
        //         usuarioExiste = true;
        //     }
        //     i++;
        // }

        if (!usuarioExiste) {
            alert("no existe el usuario o la contraseña");
        } else {
            document.getElementById("dialogo3").close();
            document.getElementById("usuarioRegistrado").style.display = 'block'
            document.getElementById("usuarioRegistrado").textContent = nombre;

            //mostramos el boton de añadir mensaje
            document.getElementById("anadir_mensaje").style.display = 'block';
            document.getElementById("entrarPag").value = "Cerrar Sesión";
            //quitamos el evento de de entrar eb ebtrarPag, y lo cambiamos por el evento cerrar sesion 
            let boton = document.getElementById("entrarPag");
            boton.removeEventListener("click", entrar);
            boton.addEventListener("click", cerrarSesion);

        }
    }
}
// function validar() {
//     let nombre = document.getElementById("nombreUsu").value;
//     let contrasena = document.getElementById("contrasenaUsu").value;
//     if(!nombre.length || !contrasena.length){
//         alert("EY!!!")
//     } else {
//         //buscamos cookie
//         let cadenaCookie = document.cookie;
//         if (document.cookie.length >= 0) {
//             let posicionPrimerCookie = cadenaCookie.indexOf(nombre + "=" + contrasena); //katherine=caramelos
//             console.log("Primera cookie at: " + posicionPrimerCookie);
//             if (posicionPrimerCookie == -1) {
//                 alert("No existen estas credenciales");
//             } else {
//                 /*if (posicionPrimerCookie != 0) {
//                     posicionPrimerCookie = cadenaCookie.indexOf("; " + nombre + "=" + contrasena);
//                     console.log(posicionPrimerCookie);
//                 }
//                 if (posicionPrimerCookie == -1) {
//                     alert("No existen estas credenciales");
//                 } else {
//                     if (posicionPrimerCookie != 0) {
//                         posicionPrimerCookie += 2;
//                     }
//                     let posicionDelSiguinete = cadenaCookie.indexOf(";", (posicionPrimerCookie + 1));
//                     if (posicionDelSiguinete == -1) {
//                         posicionDelSiguinete = posicionPrimerCookie.length;
//                     }*/
//                     let posicionDelSiguiente = cadenaCookie.indexOf(";", (posicionPrimerCookie + 1));

//                     if (posicionDelSiguiente == -1) {
//                         posicionDelSiguiente = cadenaCookie.length;
//                     }
//                     var cookieAcomprobar = cadenaCookie.substring(posicionPrimerCookie, posicionDelSiguiente);
//                     let usuario = cookieAcomprobar.substring(0, cookieAcomprobar.indexOf("="));
//                     console.log(cookieAcomprobar);
//                     document.getElementById("dialogo3").close();
//                     document.getElementById("usuarioRegistrado").style.display = 'block'
//                     document.getElementById("usuarioRegistrado").textContent = usuario;
//                     //mostramos el boton de añadir mensaje
//                     document.getElementById("anadir_mensaje").style.display = 'block';
//                     document.getElementById("entrarPag").value = "Cerrar Sesión";
//                     //quitamos el evento de de entrar eb ebtrarPag, y lo cambiamos por el evento cerrar sesion 
//                     let boton = document.getElementById("entrarPag");
//                     boton.removeEventListener("click", entrar);
//                     boton.addEventListener("click", cerrarSesion);

//             }
//         }
//     }
// }
function cancelar() {
    document.getElementById("dialogo3").close();
}

function cerrarSesion() {
    document.getElementById("usuarioRegistrado").textContent = "";
    document.getElementById("usuarioRegistrado").style.display = 'none';
    let cerrarSesion = document.getElementById("anadir_mensaje");
    cerrarSesion.style.display = 'none';
    //le añadimos al boton de entrarPag el evento de entrar, que habiamos quitado mientras el usuario estaba activo
    let boton = document.getElementById("entrarPag");
    boton.addEventListener("click", entrar);
    document.getElementById("entrarPag").value = "Entrar";

}
function abrirDialogo3() {
    entrar();
}
function insertDefinition() {
    let contenidoPalabra = document.getElementById("palabra").value.trim().toLowerCase();
    let contenidoConcepto = document.getElementById("concepto").value.trim().toLowerCase();
    let padre = document.getElementById("lista_definiciones");
    if (contenidoPalabra != "" || contenidoConcepto != "") {
        let dt = document.createElement("dt");
        let textoPalabra = document.createTextNode(contenidoPalabra);
        dt.appendChild(textoPalabra);
        let dd = document.createElement("dd");
        let textoContenido = document.createTextNode(contenidoConcepto);
        dd.appendChild(textoContenido);
        let todosdt = padre.getElementsByTagName("dt");
        let todosdd = padre.getElementsByTagName("dd");
        let ausente = true;
        let indice = 0;
        while (ausente && indice < todosdt.length) {
            let auxdt = todosdt.item(indice);
            let auxdd = todosdd.item(indice);
            if (auxdt.textContent == contenidoPalabra && auxdd.textContent != contenidoConcepto) {
                console.log(auxdt.textContent+'dt');
                console.log(contenidoPalabra+'contenidopalabra');
                console.log(auxdd.textContent+'dd');
                console.log(contenidoConcepto+'contenidoconcepto');

                auxdt.after(dd);
                ausente = false;
            } else if (auxdt.textContent == contenidoPalabra && auxdd.textContent == contenidoConcepto) {
                ausente = false;
            }
            indice += 1
        }
        if (ausente) {
            padre.appendChild(dt);
            padre.appendChild(dd);
        }
    }
}
//ordenados alfabéticamente en modo ascendente
function anadirLocalidad() {
    let contenidoLocalidad = document.getElementById("localidad").value.trim();
    let contenido = contenidoLocalidad.toLowerCase();
    let padre = document.getElementById("lista_localidades");
    let textoLocalidad = document.createTextNode(contenidoLocalidad);
    let li = document.createElement("li");
    li.appendChild(textoLocalidad);
    let todosLosLi = padre.getElementsByTagName("li");
    contenido = tratarContenido(contenido);
    if (contenido != "") {
        let indice = 0;
        let noRepetido = true;
        while (noRepetido && indice < todosLosLi.length) {
            let liExistente = todosLosLi.item(indice).textContent.toLowerCase();
            //para poder comparar hay que cambiar las tildes y todo de los li que ya se encuentran en la lista
            liExistente = tratarContenido(liExistente);
            if (liExistente == contenido) {
                noRepetido = false; //aqui comparamos y bandera a false , no se incluira porque es repetido
            } else if (liExistente > contenido) {
                //en este caso quiere decir que al ser mayor, va antes en posicione alfabetica
                noRepetido = false; //----
                padre.insertBefore(li, todosLosLi.item(indice));
            }
            indice += 1;//iterador para que siga avanzando, es un contador
        }
        if (noRepetido) {
            padre.appendChild(li);
        }
    }
}
function anadirCoche() {
    let mitabla = document.getElementById("tablaCoches");
    let padre = mitabla.querySelector("tbody");
    let registros = padre.getElementsByTagName("tr");
    //rescatamos los valores del formulario
    let marca = document.getElementById("marca").value.trim().toLowerCase();
    let modelo = document.getElementById("modelo").value.trim().toLowerCase();
    let precio = document.getElementById("precio").value.trim().toLowerCase();
    let ausente = true;
    let indice = 0;
    while (ausente && indice < registros.length) {
        let auxregis = registros.item(indice);
        let celdas = auxregis.getElementsByTagName("td");
        //primero comparamos por marca 
        if (celdas.item(0).textContent < marca) {
            let nuevoRegistro = crearElemento(marca, modelo, precio);
            padre.insertBefore(nuevoRegistro, registros.item(indice));
            //auxregis.before(nuevoRegistro);
            ausente = false;
        } else if (celdas.item(0).textContent == marca && celdas.item(1).textContent < modelo) {
            let nuevoRegistro = crearElemento(marca, modelo, precio);
            //auxregis.before(nuevoRegistro);
            padre.insertBefore(nuevoRegistro, registros.item(indice));
            ausente = false;
        } else if (celdas.item(0).textContent == marca && celdas.item(1).textContent == modelo) {
            celdas.item(2).textContent = precio;
            ausente = false;
        }
        indice += 1;
    }
    if (ausente) {
        let nuevoRegistro = crearElemento(marca, modelo, precio);
        padre.appendChild(nuevoRegistro);
    }
}
function crearElemento(marca, modelo, precio) {
    let nuevotr = document.createElement("tr");
    let nuevaMarcatd = document.createElement("td");
    let nuevaModelotd = document.createElement("td");
    let nuevoPreciotd = document.createElement("td");
    let textMarca = document.createTextNode(marca);
    let textModelo = document.createTextNode(modelo);
    let textPrecio = document.createTextNode(precio);
    nuevaMarcatd.appendChild(textMarca);
    nuevaModelotd.appendChild(textModelo);
    nuevoPreciotd.appendChild(textPrecio);
    nuevotr.appendChild(nuevaMarcatd);
    nuevotr.appendChild(nuevaModelotd);
    nuevotr.appendChild(nuevoPreciotd);
    return nuevotr;
}
function tratarContenido(variable) {
    let tildes = ["á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "ñ"];
    let vocales = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U", "nzzzz"];
    //variable = variable.toLowerCase();
    for (let i = 0; i < tildes.length; i++) {
        variable = variable.replace(tildes[i], vocales[i]);
    }
    return variable;
}
function seleccionarCA() {
    let VstAragon = ['Huesca', 'Teruel', 'Zaragoza'];
    let VstPrincipadodeAsturias = ['Asturias'];
    let VstIslasBaleares = ['Illes Balears'];
    let VstPaisVasco = ['Bizkaia', 'Gipuzkoa', 'Araba', 'Navarra', 'Lapurdi', 'Behe Nafarroa', 'Zuberoa'];
    let VstCanarias = ['Santa Cruz de Tenerife', 'Las Palmas'];
    let VstCantabria = ['Cantabria'];
    let VstCastillaLaMancha = ['Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo'];
    let VstCastillayLeon = ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora'];
    let VstCataluna = ['Barcelona', 'Gerona', 'Lérida', 'Tarragona'];
    let VstExtremadura = ['Cáceres', 'Badajoz'];
    let VstGalicia = ['La Coruña'];
    let VstMadrid = ['Madrid'];
    let VstMurcia = ['Murcia'];
    let VstNavarra = ['Navarra'];
    let VstRioja = ['La Rioja'];
    let VstValencia = ['Castellón', 'Valencia', 'Alicante'];
    let VstCeuta = ['Ceuta'];
    let VstMelilla = ['Melilla'];
    let valores = eval("Vst" + document.getElementById("comunidades").value);
    console.log(valores);
    anadirOpciones("provincias", valores);
}

function anadirOpciones(domElement, array) {
    var select = document.getElementById(domElement);
    while (select.options.length > 0) {
        select.remove(0);
    }
    console.log(select);
    for (value in array) {
        var option = document.createElement("option");
        option.text = array[value];
        select.add(option);
    }
    //console.log(array);
}
function anadirComentarioComunidad() {
    let VstAragon = "Aragón es una región del interior ubicada en el nordeste de España, compuesta por las provincias de Huesca, Zaragoza y Teruel";
    let VstPrincipadodeAsturias = "El Principado de Asturias es una comunidad autónoma uniprovincial de España, con una población de 1 028 244 habitantes";
    let VstIslasBaleares = "Las Islas Baleares son un archipiélago frente a la costa este de España, en el Mediterráneo";
    let VstPaisVasco = "El País Vasco (Euskadi) es una comunidad autónoma en el norte de España con fuertes tradiciones culturales, una célebre gastronomía y un idioma característico que antecede a las lenguas romances";
    let VstCanarias = "Canarias es un archipiélago situado en el océano Atlántico que conforma una comunidad autónoma española en el noroeste de África, con estatus de nacionalidad histórica.";
    let VstCantabria = "Cantabria es una comunidad autónoma española de carácter uniprovincial, reconocida como comunidad histórica en su Estatuto de Autonomía.​ ";
    let VstCastillaLaMancha = "Castilla-La Mancha es una región del centro de España, que envuelve el sur y el este de Madrid";
    let VstCastillayLeon = "Castilla y León​​ es una comunidad autónoma española, referida como «comunidad histórica y cultural» en su Estatuto de Autonomía.";
    let VstCataluna = "La región de Cataluña, en el noreste de España, es conocida por sus animados balnearios de Costa Brava y los montes Pirineos. ";
    let VstExtremadura = "Extremadura es una región occidental española que limita con Portugal y está compuesta por las provincias de Cáceres y Badajoz.";
    let VstGalicia = "Galicia, una comunidad autónoma del noroeste de España, es una región con abundante vegetación y una costa en el Atlántico.";
    let VstMadrid = "Madrid es un municipio y una ciudad de España, con categoría histórica de villa, ​ es la capital del Estado​ y de la Comunidad de Madrid.";
    let VstMurcia = "Murcia es una ciudad universitaria en el sureste de España y la capital de la región también llamada Murcia. ";
    let VstNavarra = "Navarra, denominada oficialmente Comunidad Foral de Navarra, ​ es una comunidad foral​ española situada en el norte de la península ibérica.";
    let VstRioja = "La Rioja es una provincia y una comunidad autónoma en el norte de España con una famosa industria vitivinícola.";
    let VstValencia = "La ciudad portuaria de Valencia se ubica en la costa sureste de España, donde el río Turia se une al mar Mediterráneo";
    let VstCeuta = "Ceuta es una ciudad autónoma española, situada en la península tingitana, en la orilla africana del estrecho de Gibraltar, en el lado oriental de este.";
    let VstMelilla = "Melilla es una ciudad autónoma española situada en el norte de África, a orillas del mar Mediterráneo.";
    let valores = eval("Vst" + document.getElementById("comunidades").value);
    document.getElementById("comentario-comunidad").style.display = 'block'
    document.getElementById("comentario-comunidad").innerHTML = valores;
}
function anadirMensajeChat() {
    document.getElementById("dialogo4").show();
    let botonAceptar = document.getElementById("aceptarChat");
    let botonCancelar = document.getElementById("cancelarChat");
    let valor = document.querySelector('input[name="img"]:checked')?.value;
    if (valor != "") {
        if (document.addEventListener) {
            botonAceptar.addEventListener("click", aceptarChat);
            botonCancelar.addEventListener("click", cancelarChat);
        } else if (document.attachEvent) {
            botonAceptar.attachEvent("onclick", aceptarChat);
            botonCancelar.attachEvent("onclick", cancelarChat);
        }
    }
}
function aceptarChat() {
    let nombre = document.getElementById("usuarioRegistrado").textContent;
    console.log(nombre);
    document.getElementById("dialogo4").close();
    let chat = document.getElementById("chatmensaje");
    let div = document.createElement("div");
    //insertamos la imagen
    let valor = document.querySelector('input[name="img"]:checked')?.value;
    let imagen = document.createElement("img");
    imagen.setAttribute("src", valor);
    imagen.setAttribute("id", "imagenChat");
    div.appendChild(imagen);
    //insertamos el chat

    let titulo = document.getElementById("titulo_chat").value;
    let comentario = document.getElementById("comentario_chat").value;

    let usuario = document.createElement("h2");
    usuario.setAttribute("id", "nombreChat");
    let tituloChat = document.createElement("h3");
    usuario.appendChild(document.createTextNode(nombre));
    tituloChat.appendChild(document.createTextNode(titulo));
    let contenidoChat = document.createElement("p");
    contenidoChat.appendChild(document.createTextNode(comentario));
    div.appendChild(usuario);
    div.appendChild(tituloChat);
    div.appendChild(contenidoChat);
    chat.appendChild(div);
    chat.append(document.getElementById("anadir_mensaje"));
}
function cancelarChat() {
    document.getElementById("dialogo4").close();
}

