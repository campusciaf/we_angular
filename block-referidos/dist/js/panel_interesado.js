// JavaScript Document
var totalTime;
//cuenado el documento estelisto inicia la funcion init
$(document).ready(init);
//funcion que se ejecuta al cargar el documento
function init(){
    //trae la informacion de la persona
    $.post("controlador/panel_interesado.php?op=traerInformacion",function (datos) {
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $(".caso_interesado").text("Caso: "+datos.caso);
            $(".nombre_completo").text(datos.nombre_completo);
            $(".estado_interesado").text("Estado: "+datos.estado);
        }else{
            totalTime = 3;
            updateClock();
            Swal.fire({icon: 'error',title: datos.info+", seras redireccionando" ,showConfirmButton: false,timer: 3000, allowOutsideClick: false})
        }
    });
    //post para traer todoa los programas
    $.post("controlador/panel_interesado.php?op=traerProgramas",function(datos){
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $(".fo_programa").html(datos.info);
        }else{
            Swal.fire({position: 'top-end',icon: 'error',title: datos.info ,showConfirmButton: false,timer: 1500})
        }
    }); 
    //traer todas las jornadas
    $.post("controlador/panel_interesado.php?op=traerJornadas",function(datos){
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $("#jornada").html(datos.info);
        }else{
            Swal.fire({position: 'top-end',icon: 'error',title: datos.info ,showConfirmButton: false,timer: 1500})
        }
    });
    //post para traer todos los documentos
    $.post("controlador/panel_interesado.php?op=traerDocumentos",function(datos){
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $("#tipo_documento").html(datos.info);
        }else{
            Swal.fire({position: 'top-end',icon: 'error',title: datos.info ,showConfirmButton: false,timer: 1500})
        }
    });
    //guardar datos personales del interesado
    $("#guardar_datos_interesado").off("submit").on("submit",function(e){
       guardarDatosInteresado(e);
    });
    //sube la imagen del soporte
    $("#subir_soporte").off("submit").on("submit",function(e){
       subirSoporte(e);
    });
    //guarda los datos de la entrevista
    $("#guardar_datos_entrevista").on("submit",function(e){
        guardarEntrevista(e);  
    });
    //guarda el documento de identidad
    $("#subir_documento_identidad").on("submit",function(e){
        subirDocumentoIdentidad(e);  
    });
    //guarda el diploma de 11
    $("#subir_diploma").on("submit",function(e){
        subirDiploma(e);  
    });
    //guarda el Acta de grado
    $("#subir_acta_grado").on("submit",function(e){
        subirActaGrado(e);  
    });
    //guarda el Seguro EPS
    $("#subir_seguro").on("submit",function(e){
        subirSeguro(e);  
    });
    //guarda la prueba a saber
    $("#subir_prueba_saber").on("submit",function(e){
        subirPruebaSaber(e);  
    });
    //limpia los campos al momento de cerrar el modal
    $('#subir_documentos').on('hidden.bs.modal', function(e){
        $(".nombre_archivo_documento").val("");
        $("#subir_documento_identidad")[0].reset();    
        $(".nombre_archivo_diploma").val("");
        $("#subir_diploma")[0].reset();
        $(".nombre_archivo_acta").val("");
        $("#subir_acta_grado")[0].reset();
        $(".nombre_archivo_seguro").val("");
        $("#subir_seguro")[0].reset();
        $(".nombre_archivo_pruebas").val("");
        $("#subir_prueba_saber")[0].reset();
    });
    //limpia los campos al momento de cerrar el modal
    $('#recibo_soporte').on('hidden.bs.modal', function(e){
        $(".nombre_archivo_soporte").val("");
        $("#subir_soporte")[0].reset();
    });
}
//formulario para traer los datos del interesado
function traerInformacion(){
    //modal solo se cierra cuando le dan cliack al boton de cerrar
    $('#formularioDatos').modal({backdrop: 'static', keyboard: false})
    //post para traer datos personales del interesado
    $.post("controlador/panel_interesado.php?op=traerInformacion",function (datos) {
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $(".caso_interesado").text("Caso: "+datos.caso);
            $(".nombre_completo").text(datos.nombre_completo);
            $("#fo_programa").val(datos.fo_programa);
            $("#jornada").val(datos.jornada_e);
            $("#nombre").val(datos.nombre);
            $("#nombre_2").val(datos.nombre_2);
            $("#apellidos").val(datos.apellidos);
            $("#apellidos_2").val(datos.apellidos_2);
            $("#tipo_documento").val(datos.tipo_documento);
            $("#celular").val(datos.celular);
            $("#email").val(datos.correo);
        }else{
            totalTime = 3;
            updateClock();
            Swal.fire({icon: 'error',title: datos.info+", seras redireccionando" ,showConfirmButton: false,timer: 3000, allowOutsideClick: false})
        }
    });
}
//cuenta regresiva para redireccionar al login
function updateClock(){
    //mientras no este en sero el ira disminuyendo el total time a 0 para redireccionar 
    if(!totalTime==0){
        totalTime-=1;
        //hace que cada segundo se llame esta funcion
        setTimeout("updateClock()",1000);
    }else{
        //redirecciona al panel
        window.location.href = "index.php";
    }
}
//guarda los datos que haya actualizado el estudiante
function guardarDatosInteresado(e){
    //debugger;
    e.preventDefault();
    var formData = new FormData($("#guardar_datos_interesado")[0]);
    $(".btn_guardar_datos_interesado").prop("disabled",true);
    //peticion ajax para validar que la contraseña y el usuario ingresados sean correctos
    $.ajax({
        url: "controlador/panel_interesado.php?op=guardarDatosInteresado",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            $(".btn_guardar_datos_interesado").prop("disabled",false);
            //console.log(datos);
            datos = JSON.parse(datos);
            //si son correctos redirecciona, sino muestra un mensaje de error
            if(datos.exito == 1){
                Swal.fire({icon: 'success',title: datos.info ,showConfirmButton: false,timer: 1500});
                $("#formularioDatos").modal('hide');
            }else{
                Swal.fire({icon: 'error',title: datos.info ,showConfirmButton: false,timer: 1500});
            }
        }
    });
}
//toma el nombre del file y lo inserta en el campo visual
function tomarNombreInscripcion(nombre){
    var filename = nombre.replace(/^.*\\/, "");
    $(".nombre_archivo_soporte").val(filename);
}
//sube la imagen del soporte
function subirSoporte(e){
    e.preventDefault();
    var formData = new FormData($("#subir_soporte")[0]);
    $(".btn_subir_inscripcion").prop("disabled",true);
    //peticion ajax para validar que la contraseña y el usuario ingresados sean correctos
    $.ajax({
        url: "controlador/panel_interesado.php?op=subirSoporte",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            $(".btn_subir_inscripcion").prop("disabled",false);
            //console.log(datos);
            datos = JSON.parse(datos);
            //si son correctos redirecciona, sino muestra un mensaje de error
            if(datos.exito == 1){
                Swal.fire({icon: 'success',title: datos.info ,showConfirmButton: false,timer: 1500});
                $("#recibo_soporte").modal('hide');
            }else{
                Swal.fire({icon: 'error',title: datos.info ,showConfirmButton: false,timer: 3000});
            }
        }
    });
}
//Trae la foto del soporte de inscripcion
function traerSoporteInscripcion(){
    //post para traer imagen del soporte del interesado
    $.post("controlador/panel_interesado.php?op=traerSoporteInscripcion",function (datos) {
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            if(datos.ext == "pdf" || datos.ext == "PDF"){
                $(".aqui_soporte").html('<a href="../files/oncenter/img_inscripcion/'+datos.archivo+'" target="_blank"><img src="dist/img/pdf.png" width="100%" alt=""></a>');
            }else{
                $(".aqui_soporte").html('<img src="../files/oncenter/img_inscripcion/'+datos.archivo+'" width="100%" alt="">');
            }
        }
    });
}
//traer los datos de la entrevista
function traerEntrevista(){
    //post para traer datos personales del interesado
    $.post("controlador/panel_interesado.php?op=traerEntrevista",function (datos) {
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $("#id_interesado").val(datos.id_interesado);
            $("#padre").val(datos.padre);
            $("#madre").val(datos.madre);
            $("#sostiene").val(datos.sostiene);
            $("#dedicacion_papa").val(datos.dedicacion_papa);
            $("#dedicacion_mama").val(datos.dedicacion_mama);
            $("#labora").val(datos.labora);
            $("#donde_labora").val(datos.donde_labora);
            $("#salario").val(datos.salario);
            $("#hermanos").val(datos.hermanos);
            $("#motiva").val(datos.motiva);
            $("#conoce_plan").val(datos.conoce_plan);
            $("#otro_programa").val(datos.otro_programa);
            $("#cual_programa").val(datos.cual_programa);
            $("#descarto").val(datos.descarto);
            $("#razon").val(datos.razon);
            $("#guardar_datos_entrevista :input").prop("disabled", true);
            $(".box_btn_guardar").html("");
        }else if(datos.exito == 0){
            totalTime = 3;
            updateClock();
            Swal.fire({icon: 'error',title: datos.info+", seras redireccionando" ,showConfirmButton: false,timer: 3000, allowOutsideClick: false})
        }
    });
}
//mostrar datos para cuando el interesado seleccione si labora
function mostrarLabora(opcion){
    if(opcion == "si"){
        $(".si_labora").removeClass("d-none");
    }else if(opcion == "no"){
        $(".si_labora").addClass("d-none");
    }
}
//mostrar datos para cuando el interesado seleccione si queria otro programa
function otroPrograma(opcion){
    if(opcion == "si"){
        $(".cual_programa").removeClass("d-none");
    }else if(opcion == "no"){
        $(".cual_programa").addClass("d-none");
    }
}
//guardar los datos insertados de laentrevista
function guardarEntrevista(e){
    e.preventDefault();
        var formData = new FormData($("#guardar_datos_entrevista")[0]);
        $(".btn_guardar_entrevista").prop("disabled",true);
        $.ajax({
            url:  "controlador/panel_interesado.php?op=guardarEntrevista",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(datos){
                $(".btn_guardar_entrevista").prop("disabled",true);
                //console.log(datos);
                datos = JSON.parse(datos);
                //si son correctos redirecciona, sino muestra un mensaje de error
                if(datos.exito == 1){
                    Swal.fire({icon: 'success',title: datos.info ,showConfirmButton: false,timer: 1500});
                    $("#guardar_datos_entrevista :input").prop("disabled", true);
                    $("#RealizarEntrevista").modal('hide');
                    $(".box_btn_guardar").html("");
                }else{
                    Swal.fire({icon: 'error',title: datos.info ,showConfirmButton: false,timer: 1500});
                }
            }
        });	
}
//verificar si ya subio documentos
function traerDocumentosSubidos(){
    //post para traer las imagen de soporte del interesado
    $.post("controlador/panel_interesado.php?op=traerDocumentoIdentidad",function (datos) {
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $(".alert-documento").removeClass("d-none");
            $("#subir_documento_identidad").addClass("d-none");
            $(".img_documento").attr("href", "../files/oncenter/img_cedula/"+datos.img_subida);
        }else if(datos.exito == 0){
            totalTime = 3;
            updateClock();
            Swal.fire({icon: 'error',title: datos.info+", seras redireccionando" ,showConfirmButton: false,timer: 3000, allowOutsideClick: false})
        }else{
            $(".alert-documento").addClass("d-none");
            $("#subir_documento_identidad").removeClass("d-none");
        }
    });
    //post para traer soporte del diploma interesado
    $.post("controlador/panel_interesado.php?op=traerDiploma",function (datos) {
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $(".alert-diploma").removeClass("d-none");
            $("#subir_diploma").addClass("d-none");
            $(".img_diploma").attr("href", "../files/oncenter/img_diploma/"+datos.img_subida);
        }else if(datos.exito == 0){
            totalTime = 3;
            updateClock();
            Swal.fire({icon: 'error',title: datos.info+", seras redireccionando" ,showConfirmButton: false,timer: 3000, allowOutsideClick: false})
        }else{
            $(".alert-diploma").addClass("d-none");
            $("#subir_diploma").removeClass("d-none");
        }
    });
    //post para traer soporte del acta de grado interesado
    $.post("controlador/panel_interesado.php?op=traerActaGrado",function (datos) {
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $(".alert-acta").removeClass("d-none");
            $("#subir_acta_grado").addClass("d-none");
            $(".img_acta").attr("href", "../files/oncenter/img_acta/"+datos.img_subida);
        }else if(datos.exito == 0){
            totalTime = 3;
            updateClock();
            Swal.fire({icon: 'error',title: datos.info+", seras redireccionando" ,showConfirmButton: false,timer: 3000, allowOutsideClick: false})
        }else{
            $(".alert-acta").addClass("d-none");
            $("#subir_acta_grado").removeClass("d-none");
        }
    });
    //post para traer soporte del seguro EPS interesado
    $.post("controlador/panel_interesado.php?op=traerSeguro",function (datos) {
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $(".alert-seguro").removeClass("d-none");
            $("#subir_seguro").addClass("d-none");
            $(".img_seguro").attr("href", "../files/oncenter/img_salud/"+datos.img_subida);
        }else if(datos.exito == 0){
            totalTime = 3;
            updateClock();
            Swal.fire({icon: 'error',title: datos.info+", seras redireccionando" ,showConfirmButton: false,timer: 3000, allowOutsideClick: false})
        }else{
            $(".alert-seguro").addClass("d-none");
            $("#subir_seguro").removeClass("d-none");
        }
    });
    //post para traer soporte del seguro EPS interesado
    $.post("controlador/panel_interesado.php?op=traerPruebaSaber",function (datos) {
        //console.log(datos);
        datos = JSON.parse(datos);
        if(datos.exito == 1){
            $(".alert-prueba_saber").removeClass("d-none");
            $("#subir_prueba_saber").addClass("d-none");
            $(".img_prueba_saber").attr("href", "../files/oncenter/img_prueba/"+datos.img_subida);
        }else if(datos.exito == 0){
            totalTime = 3;
            updateClock();
            Swal.fire({icon: 'error',title: datos.info+", seras redireccionando" ,showConfirmButton: false,timer: 3000, allowOutsideClick: false})
        }else{
            $(".alert-prueba_saber").addClass("d-none");
            $("#subir_prueba_saber").removeClass("d-none");
        }
    });
}
//subir documento de identidad
function subirDocumentoIdentidad(e){
    e.preventDefault();
    var formData = new FormData($("#subir_documento_identidad")[0]);
    $(".btn_documento_identidad").prop("disabled",true);
    //peticion ajax para validar que la contraseña y el usuario ingresados sean correctos
    $.ajax({
        url: "controlador/panel_interesado.php?op=subirDocumentoIdentidad",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            $(".btn_documento_identidad").prop("disabled",false);
            //console.log(datos);
            datos = JSON.parse(datos);
            //si son correctos redirecciona, sino muestra un mensaje de error
            if(datos.exito == 1){
                Swal.fire({icon: 'success',title: datos.info ,showConfirmButton: false,timer: 1500});
                $(".alert-documento").removeClass("d-none");
                $("#subir_documento_identidad").addClass("d-none");
                $(".img_documento").attr("href", "../files/oncenter/img_cedula/"+datos.img_subida);
            }else{
                Swal.fire({icon: 'error',title: datos.info ,showConfirmButton: false,timer: 3000});
            }
        }
    });
}
//toma el nombre del file y lo inserta en el campo visual
function tomarNombreDocumento(nombre){
    var filename = nombre.replace(/^.*\\/, "");
    $(".nombre_archivo_documento").val(filename);
}
//toma el nombre del file y lo inserta en el campo visual
function tomarNombreDiploma(nombre){
    var filename = nombre.replace(/^.*\\/, "");
    $(".nombre_archivo_diploma").val(filename);
}
//toma el nombre del file y lo inserta en el campo visual
function tomarNombreActa(nombre){
    var filename = nombre.replace(/^.*\\/, "");
    $(".nombre_archivo_acta").val(filename);
}
//toma el nombre del file y lo inserta en el campo visual
function tomarNombreSeguro(nombre){
    var filename = nombre.replace(/^.*\\/, "");
    $(".nombre_archivo_seguro").val(filename);
}
//toma el nombre del file y lo inserta en el campo visual
function tomarNombrePruebas(nombre){
    var filename = nombre.replace(/^.*\\/, "");
    $(".nombre_archivo_pruebas").val(filename);
}
//subir Diploma 
function subirDiploma(e){
    e.preventDefault();
    var formData = new FormData($("#subir_diploma")[0]);
    $(".btn_diploma").prop("disabled",true);
    //peticion ajax para validar que la contraseña y el usuario ingresados sean correctos
    $.ajax({
        url: "controlador/panel_interesado.php?op=subirDiploma",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            $(".btn_diploma").prop("disabled",false);
            //console.log(datos);
            datos = JSON.parse(datos);
            //si son correctos redirecciona, sino muestra un mensaje de error
            if(datos.exito == 1){
                Swal.fire({icon: 'success',title: datos.info ,showConfirmButton: false,timer: 1500});
                $(".alert-diploma").removeClass("d-none");
                $("#subir_diploma").addClass("d-none");
                $(".img_diploma").attr("href", "../files/oncenter/img_diploma/"+datos.img_subida);
            }else{
                Swal.fire({icon: 'error',title: datos.info ,showConfirmButton: false,timer: 3000});
            }
        }
    });
}
//subir acta de grado
function subirActaGrado(e){
    e.preventDefault();
    var formData = new FormData($("#subir_acta_grado")[0]);
    $(".btn_acta_grado").prop("disabled",true);
    //peticion ajax para validar que la contraseña y el usuario ingresados sean correctos
    $.ajax({
        url: "controlador/panel_interesado.php?op=subirActaGrado",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            $(".btn_acta_grado").prop("disabled",false);
            //console.log(datos);
            datos = JSON.parse(datos);
            //si son correctos redirecciona, sino muestra un mensaje de error
            if(datos.exito == 1){
                Swal.fire({icon: 'success',title: datos.info ,showConfirmButton: false,timer: 1500});
                $(".alert-acta").removeClass("d-none");
                $("#subir_acta_grado").addClass("d-none");
                $(".img_acta").attr("href", "../files/oncenter/img_acta/"+datos.img_subida);
            }else{
                Swal.fire({icon: 'error',title: datos.info ,showConfirmButton: false,timer: 3000});
            }
        }
    });
}
//subir Seguro 
function subirSeguro(e){
    e.preventDefault();
    var formData = new FormData($("#subir_seguro")[0]);
    $(".btn_seguro").prop("disabled",true);
    //peticion ajax para validar que la contraseña y el usuario ingresados sean correctos
    $.ajax({
        url: "controlador/panel_interesado.php?op=subirSeguro",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            $(".btn_seguro").prop("disabled",false);
            //console.log(datos);
            datos = JSON.parse(datos);
            //si son correctos redirecciona, sino muestra un mensaje de error
            if(datos.exito == 1){
                Swal.fire({icon: 'success',title: datos.info ,showConfirmButton: false,timer: 1500});
                $(".alert-seguro").removeClass("d-none");
                $("#subir_seguro").addClass("d-none");
                $(".img_seguro").attr("href", "../files/oncenter/img_salud/"+datos.img_subida);
            }else{
                Swal.fire({icon: 'error',title: datos.info ,showConfirmButton: false,timer: 3000});
            }
        }
    });
}
//subir Acata de 
function subirPruebaSaber(e){
    e.preventDefault();
    var formData = new FormData($("#subir_prueba_saber")[0]);
    $(".btn_seguro").prop("disabled",true);
    //peticion ajax para validar que la contraseña y el usuario ingresados sean correctos
    $.ajax({
        url: "controlador/panel_interesado.php?op=subirPruebasSaber",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            $(".btn_seguro").prop("disabled",false);
            //console.log(datos);
            datos = JSON.parse(datos);
            //si son correctos redirecciona, sino muestra un mensaje de error
            if(datos.exito == 1){
                Swal.fire({icon: 'success',title: datos.info ,showConfirmButton: false,timer: 1500});
                $(".alert-prueba_saber").removeClass("d-none");
                $("#subir_prueba_saber").addClass("d-none");
                $(".img_prueba_saber").attr("href", "../files/oncenter/img_prueba/"+datos.img_subida);
            }else{
                Swal.fire({icon: 'error',title: datos.info ,showConfirmButton: false,timer: 3000});
            }
        }
    });
}