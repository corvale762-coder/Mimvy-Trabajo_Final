<?php

include("conexion.php");

$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

$sql = "INSERT INTO usuarios(usuario, contrasena)
VALUES('$usuario', '$contrasena')";

if(mysqli_query($conexion, $sql)){

    header("Location: login.html");
    exit();

} else {

    echo "Error al registrar";

}

?>