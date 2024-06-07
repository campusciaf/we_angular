//Función que se ejecuta al inicio
function init(){
	$("#formulario_1").on("submit",function(e){
		guardaryeditar(e, 1);	
	});
	$("#formulario_2").on("submit",function(e){
		guardaryeditar(e, 2);	
	});
}
//Función para guardar o editar
function guardaryeditar(e, formulario){
    e.preventDefault(); //No se activará la acción predeterminada del evento
    let telefono = $("#formulario_"+formulario+" #celular").val(); 
    if(telefono.length == 10){
        $(".btnGuardar").prop("disabled",true);
        var formData = new FormData($("#formulario_"+formulario)[0]);
        $.ajax({
            url: "controlador/index.php?op=guardar",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(datos){
                console.log(datos);
                $(location).attr("href","gracias.html");
            }
        });   
    }else{
        swal({
          title: "Opps!",
          text: "Has escrito tu número de celular mal(10 Digitos)",
          icon: "error",
          button: "Volver!",
        });
    }
}
init();