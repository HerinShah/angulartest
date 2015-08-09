<?php
require_once('connection.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$id = $request->id;

$result = mysql_query("SELECT * from profile where user_id='$id'")
or die(mysql_error());
$rows = array();
while($row = mysql_fetch_assoc($result)) {
    $rows[] = $row;
}
$output = json_encode(array('resp' => $rows));
print $output;die;


?>