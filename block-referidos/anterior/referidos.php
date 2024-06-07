<?php
include("../conexion.php");
$con=conectar();
require ('mail/send.php');
require ('mail/template.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="../estilos/estilos.css" rel="stylesheet" type="text/css">
<title>Interesados</title>
</head>
<body>
<?php
$correo_destino="sistemasdeinformacion@ciaf.edu.co";

$remite=$_POST['nombre'];

$periodo="2020-2";	
$nombre=$_POST['nombre'];
$cedula=$_POST['cedula'];
$telefono=$_POST['telefono'];
$correo=$_POST['correo'];
$programa=$_POST['programa'];
$jornada=$_POST['jornada'];	
	
	
$nombrer=$_POST['nombrer'];
$cedular=$_POST['cedular'];
$telefonor=$_POST['telefonor'];
$correor=$_POST['correor'];
$relacion=$_POST['relacion'];	

	
$fecha=date('Y-m-d');
$hora=date('h:i:s');
$jor_hora=date('A');

$medio="Referido";
$estado="Interesado";

$asunto = $programa;
	

 $mensaje="

<br><font size='4px' color='blue'><b>A quién refieres: </font><font size='4px'> " . $nombre . "</b></font><br>
<br><font size='4px' color='blue'><b>Cédula: </font><font size='4px'> " . $cedula . "</b></font><br>
<br><font size='4px' color='blue'><b>Numero Contacto: </font><font size='4px'> " . $telefono . "</b></font><br>
<br><font size='4px' color='blue'><b>Correo Contacto: </font><font size='4px'> " . $correo . "</b></font><br>
<br><font size='4px' color='blue'><b>Programa: </font><font size='4px'> " . $programa . "</b></font><br>
<br><font size='4px' color='blue'><b>Jornada: </font><font size='4px'> " . $jornada . "</b></font><br>
<br><font size='4px' color='blue'><b>Mensaje: </font><br>

-----------------------------------------------------------<br>
<br><font size='4px' color='blue'><b>Tus Datos: </font><font size='4px'> " . $nombrer . "</b></font><br>
<br><font size='4px' color='blue'><b>Cédula: </font><font size='4px'> " . $cedular . "</b></font><br>
<br><font size='4px' color='blue'><b>Numero Contacto: </font><font size='4px'> " . $telefonor . "</b></font><br>
<br><font size='4px' color='blue'><b>Correo Contacto: </font><font size='4px'> " . $correor . "</b></font><br>
<br><font size='4px' color='blue'><b>Programa: </font><font size='4px'> Relación que tienes con la CIAF </b></font><br>
<br><font size='4px' color='blue'><b>Relación: </font><font size='4px'> " . $relacion . "</b></font><br>
 
<br>-----------------------------------------------------------<br>
 ";

enviar_correo($correo_destino,$asunto,$mensaje);

	
$insertar_interesado=mysql_query("INSERT INTO `interesados`(`identificacion`, `fo_programa`, `jornada_e`, `nombre`, `celular`,`email`, `clave`,`periodo`, `fecha_ingreso`, `hora`, `jor_hora`, `medio`, `estado`,`periodo_campana`) VALUES('$cedula','$programa',`$jornada`,'$nombre','$telefono','$correo','$cedula','$periodo','$fecha','$hora','$jor_hora','$medio','$estado','$periodo')",$con);


$buscarid=mysql_query("select * from interesados where identificacion='" . $cedula ."' ",$con);

$dato=mysql_fetch_array($buscarid);

$mi_id=$dato["id_estudiante"];

$insertar_interesado=mysql_query("INSERT INTO `interesados_academicos`(`id_estudiante`) VALUES('$mi_id')",$con);

?>







<div class="carga">
  <img src="../imagenes/loading.gif" /><br /><br />
    <span class="titulo10">Enviando Mensaje</span><br><br>
     <b>¡En la CIAF, Tu puedes cumplir tus sueños!</b><br>
     <b>Registro Exitoso</b>
</div>


</div> 
</body>
</html>

                              
<script>
var pagina = 'http://feriavirtual.ciaf.edu.co/';
var segundos = 2;
function redireccion() { document.location.href=pagina;}
setTimeout("redireccion()",segundos*1000);
</script>
 