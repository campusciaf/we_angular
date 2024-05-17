<?php
//Incluímos inicialmente la conexión a la base de datos
require "../config/Conexion.php";
class RegistrarUsuario{
	//Implementamos nuestro constructor
	public function __construct(){
	}
	//Implementamos un método para insertar seguimiento
	public function insertarCliente($identificacion, $fo_programa, $jornada_e, $nombre, $celular, $email, $clave, $periodo_ingreso, $fecha, $hora, $medio, $conocio, $estado, $periodo_campana, $id_usuario,$nombre2,$celular2,$email2,$relacion){
		$sql="INSERT INTO on_interesados(identificacion, fo_programa, jornada_e, nombre, celular, email, clave, periodo_ingreso, fecha_ingreso, hora_ingreso, medio, conocio, estado, periodo_campana, id_usuario) VALUES('$identificacion', '$fo_programa', '$jornada_e', '$nombre', '$celular', '$email', '$clave', '$periodo_ingreso', '$fecha' ,'$hora' ,'$medio', '$conocio', '$estado', '$periodo_campana', '$id_usuario')";
		global $mbd;
		$consulta = $mbd->prepare($sql);
        if($consulta->execute()){
                $id_retorna = $mbd->lastInsertId();	
                $fecha_graduacion="0000-00-00";
                $sql3="INSERT INTO on_interesados_datos(id_estudiante, fecha_graduacion) VALUES ('$id_retorna', '$fecha_graduacion')";
				global $mbd;
				$consulta3 = $mbd->prepare($sql3);
				$consulta3->execute();
			
				$sql4="INSERT INTO referidos(id_estudiante, nombre, correo, celular, relacion, fecha, hora, periodo_campana) VALUES ('$id_retorna', '$nombre2','$email2','$celular2','$relacion','$fecha','$hora','$periodo_campana')";
				global $mbd;
				$consulta4 = $mbd->prepare($sql4);
				$consulta4->execute();
			
			
			return true;
		}else{
			return false;
		}
	}
    public function insertarInteresadoAcademico($id){
        global $mbd;
        $sentencia = $mbd->prepare("INSERT INTO `on_interesados_datos`(id_academicos, id_estudiante) VALUES (NULL,:id)");
        $sentencia->bindParam(":id", $id);
        $sentencia->execute();
        return $mbd->lastInsertId();
    }
}
?>