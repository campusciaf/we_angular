<?php 
session_start();
require_once "global.php";
try{
    $mbd = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USERNAME, DB_PASSWORD);
	/*print "good";*/
	$mbd->exec("set names utf8");
}catch (PDOException $e) {
    echo "¡Error!: " . $e->getMessage() . "<br/>";
    die();
}
if (!function_exists('limpiarCadena')){
	function limpiarCadena($str){
		return $str;
	}
}
$sentencia = $mbd->prepare("SELECT * FROM `on_periodo_actual`");
$sentencia->execute();
$registro = $sentencia->fetch(PDO::FETCH_ASSOC);
$_SESSION['periodo_actual'] = $registro['periodo_actual'];
$_SESSION['periodo_campaña'] = $registro['periodo_campana']; 
?>