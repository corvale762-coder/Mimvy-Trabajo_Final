<?php

include("conexion.php");

$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

$sql = "SELECT * FROM usuarios 
WHERE usuario='$usuario' 
AND contrasena='$contrasena'";

$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {

    echo "Inicio de sesión exitoso";

} else {

    echo "Usuario o contraseña incorrectos";

}

?>