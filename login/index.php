<?php

session_start();

if(!isset($_SESSION['usuario'])){
    header("Location: login.html");
    exit();
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Inicio</title>
</head>
<body>

    <h1>
        Bienvenido <?php echo $_SESSION['usuario']; ?>
    </h1>

    <a href="logout.php">
        <button>Cerrar sesión</button>
    </a>

</body>
</html>