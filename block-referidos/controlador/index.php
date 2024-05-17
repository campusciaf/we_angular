<?php
//Llamamo el modelo para utilizar las conexiones a bd 
require_once "../modelos/Index.php";
$registrarusuario = new RegistrarUsuario();

// definimos las variables para el periodo actual.
$rsptaperiodo = $registrarusuario->periodoactual();	
$periodo_ingreso=$rsptaperiodo["periodo_actual"];
$periodo_campana=$rsptaperiodo["periodo_siguiente"];



//tiempo en horas a colombia y se incluye el correo para enviar credenciales
date_default_timezone_set("America/Bogota");		
$fecha = date('Y-m-d');
$hora = date('h:i:s');
//datos post a quien refiere
$nombre = isset($_POST["nombre_completo"])?limpiarCadena($_POST["nombre_completo"]):"";
$identificacion = isset($_POST["identificacion"])?limpiarCadena($_POST["identificacion"]):"";
$email = isset($_POST["correo"])?limpiarCadena($_POST["correo"]):"";
$celular = isset($_POST["celular"])?limpiarCadena($_POST["celular"]):"";
$fo_programa = isset($_POST["programa"])?limpiarCadena($_POST["programa"]):"";
$jornada_e = isset($_POST["jornada"])?limpiarCadena($_POST["jornada"]):"";

// datos post referido
$nombre2 = isset($_POST["nombre_completo2"])?limpiarCadena($_POST["nombre_completo2"]):"";
$identificacion2 = isset($_POST["identificacion2"])?limpiarCadena($_POST["identificacion2"]):"";
$email2 = isset($_POST["correo2"])?limpiarCadena($_POST["correo2"]):"";
$celular2 = isset($_POST["celular2"])?limpiarCadena($_POST["celular2"]):"";
$relacion = isset($_POST["relacion"])?limpiarCadena($_POST["relacion"]):"";


//opciones a ejecutar
switch($_GET["op"]){
    //iniciar proceso es para validar si ya existe en la base de datos, para registrarlo
    case "guardar":
		$id_usuario="1"; // quiere decir lo realiza el sistema
		$identificacion="1".generarCodigo(10);
		$clave = md5($identificacion);
		$medio = "Marketing-digital";
        $conocio = "Referido";
		$estado = "Interesado";
		$rspta = $registrarusuario->insertarCliente($identificacion, $fo_programa, $jornada_e, $nombre, $celular, $email, $clave, $periodo_ingreso, $fecha, $hora, $medio, $conocio, $estado, $periodo_campana, $id_usuario,$nombre2,$celular2,$email2,$relacion);
		echo $rspta ? "registro Exitoso" : "No se pudo registrar";
    break;
}
//generea un codigo aleatorio
function generarCodigo($longitud){
    $key = '';
    $pattern = '1234567890';
    $max = strlen($pattern) - 1;
    for($i = 0; $i < $longitud; $i++) {
        $key .= $pattern[mt_rand(0, $max)];
    }
    return $key;
}


?>