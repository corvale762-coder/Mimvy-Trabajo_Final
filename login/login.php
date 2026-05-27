<?php

session_start();

include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    $sql = "SELECT * FROM usuarios 
            WHERE usuario='$usuario' 
            AND contrasena='$contrasena'";

    $resultado = mysqli_query($conexion, $sql);

    if(mysqli_num_rows($resultado) > 0){

        $_SESSION['usuario'] = $usuario;

        header("Location: index.php");
        exit();

    } else {

        echo "Usuario o contraseña incorrectos";

    }

}
?>