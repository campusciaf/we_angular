//Función que se ejecuta al inicio
function init(){

	$("#formulario").on("submit",function(e)
	{
		guardaryeditar(e);	
	});
//Función para guardar o editar
}
function guardaryeditar(e)
{
	
	e.preventDefault(); //No se activará la acción predeterminada del evento
	$("#btnGuardar").prop("disabled",true);
	var formData = new FormData($("#formulario")[0]);

	$.ajax({
		url: "controlador/index.php?op=guardar",
	    type: "POST",
	    data: formData,
	    contentType: false,
	    processData: false,

	    success: function(datos)
	    {   
			
	          alertify.success(datos);          
			$(location).attr("href","gracias.html");
			
	    }

	});
	
}

init();