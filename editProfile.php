<?php
require_once('connection.php');
$userid=$_GET['userid'];
$result = mysql_query("SELECT * from profile where user_id='$userid'")
or die(mysql_error());
$row = array();


?>

<!DOCTYPE html>
<html>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body ng-app="myNoteAppEdit" ng-controller="myNoteCtrlEdit">

<h2>Edit Profile</h2>
<?php
while($row = mysql_fetch_assoc($result)) {
   //print_r($row);die;
    //echo htmlentities($row['name']);die;
    ?>
Name: <input type="text" ng-model="Name" value="<?php echo htmlentities($row['name']); ?>"><br>
Email: <input type="text" ng-model="Email" value="<?php echo htmlentities($row['email']); ?>"><br>
Address: <input type="text" ng-model="Address" value="<?php echo htmlentities($row['address']); ?>"><br>
UserName: <input type="text" ng-model="UserName" value="<?php echo htmlentities($row['username']); ?>"><br>
Password: <input type="password" ng-model="Password" value="<?php echo htmlentities($row['password']); ?>"><br>
Profileimage: <input type="text" ng-model="profileimage" value="<?php echo htmlentities($row['profileoic']); ?>">
    <input type="hidden" ng-model="id" value="<?php echo htmlentities($row['user_id']); ?>"><br>
<?php

}
?>

<textarea ng-model="message" cols="40" rows="10"></textarea>

<p>
    <button ng-click="Update()">Update</button>
    <button ng-click="clear()">Clear</button>
    <button ng-click="Back()">View Profiles</button>
</p>



<script src="myNoteAppEdit.js"></script>

<script src="myNoteCtrledit.js"></script>

</body>
</html>