<?php

include 'connection.php';

$result = mysql_query("SELECT * from profile")
or die(mysql_error());
$rows = array();
while($row = mysql_fetch_assoc($result)) {
    $rows[] = $row;
}
$output = json_encode(array('resp' => $rows));
print $output;



?>