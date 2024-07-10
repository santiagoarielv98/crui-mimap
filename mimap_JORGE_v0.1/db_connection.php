<?php
$servername = "localhost";
$username = "shark_root@localhost";
$password = "Mi2068LosPozos!";
$dbname = "shark_ituzaingo";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>