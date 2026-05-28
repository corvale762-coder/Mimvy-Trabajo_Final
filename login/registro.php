<?php

include("conexion.php");

$nombre = $_POST['nombre_completo'];
$usuario = $_POST['usuario'];
$telefono = $_POST['telefono'];
$contrasena = $_POST['contrasena'];

$sql = "INSERT INTO usuarios 
(nombre_completo, usuario, telefono, contrasena)

VALUES 
('$nombre', '$usuario', '$telefono', '$contrasena')";

if ($conexion->query($sql) === TRUE) {
    echo "Registro exitoso";
} else {
    echo "Error: " . $conexion->error;
}

?>