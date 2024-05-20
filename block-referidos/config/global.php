<?php

define("DB_HOST", "localhost");
//Puerto del servidor de base de datos
define("DB_PORT", "3306");
//Nombre de la base de datos
define("DB_NAME", "ciaf_v4");
//Usuario de la base de datos
define("DB_USERNAME", "root");
//Contraseña del usuario de la base de datos
define("DB_PASSWORD", "");
//definimos la codificación de los caracteres
define("DB_ENCODE", "utf8");
//Definimos una constante como nombre del proyecto
define("PRO_NOMBRE", "CIAFI");

// //Ip de la pc servidor de base de datos
// define("DB_HOST", "localhost");
// //Nombre de la base de datos
// define("DB_NAME", "ciaf_v4");
// //Usuario de la base de datos
// define("DB_USERNAME", "ciaf_v4");
// //Contrase�0�9a del usuario de la base de datos
// define("DB_PASSWORD", "soluciones2019");
// //definimos la codificaci��n de los caracteres
// define("DB_ENCODE", "utf8");
// //Definimos una constante como nombre del proyecto
// define("PRO_NOMBRE", "CIAFI"); 

// Función propia para almacenar errores de PHP (no excepciones)
function GenerarErrorLog($errno, $errstr, $errfile, $errline){
    // Variable global para acceder al archivo de log
    global $archivo_log; 
    // Directorio donde ocurrió el error
    $errorDir = dirname($errfile); 
    // Archivo donde se guardarán los errores
    $archivo_log = $errorDir . '/error_log.log'; 
    // Mensaje de error con formato de fecha y detalles del error
    $mensaje_error = "[" . date('Y-m-d H:i:s') . "] Error: {$errno} : {$errstr} en el archivo {$errfile} en la línea {$errline}\n";
    // Escribe el error en el archivo de log
    error_log($mensaje_error, 3, $archivo_log); 
    // Devuelve true para no interferir con el manejador de errores estándar de PHP
    return true; 
}
// Función para manejar excepciones no capturadas
function GenerarExceptionLog($exception){
    // Variable global para acceder al archivo de log
    global $archivo_log; 
    // Directorio donde ocurrió la excepción
    $errorDir = dirname($exception->getFile()); 
    // Archivo donde se guardarán las excepciones
    $archivo_log = $errorDir . '/error_log.log'; 
    // Mensaje de excepción con formato de fecha y detalles del error
    $mensaje_error = "[" . date('Y-m-d H:i:s') . "] Exception: " . $exception->getMessage() . " en el archivo " . $exception->getFile() . " en la línea " . $exception->getLine() . "\n";
    // Escribe la excepción en el archivo de log
    error_log($mensaje_error, 3, $archivo_log); 
}
// Establece la función de manejo de errores como manejador de errores de PHP
set_error_handler('GenerarErrorLog');
// Establece la función de manejo de excepciones como manejador de excepciones de PHP
set_exception_handler('GenerarExceptionLog');
// Configura PHP para reportar todos los tipos de errores
error_reporting(E_ALL);
// Habilita la visualización de errores en el entorno de desarrollo
ini_set('display_errors', 1);

?>