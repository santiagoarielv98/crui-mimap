<?php
// search.php
include 'db_connection.php';

$search = $_GET['q'];

$sql = "SELECT * FROM ENTIDADES WHERE nombre_fantasia LIKE '%$search%' OR direccion LIKE '%$search%' OR rubro LIKE '%$search%'";
$result = $conn->query($sql);

$entities = array();
while($row = $result->fetch_assoc()) {
    $entities[] = $row;
}

echo json_encode($entities);
?>
