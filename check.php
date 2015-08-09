<?php

include 'connection.php';
/*This page for file upload and insert,update profile information*/
if ( !empty( $_FILES ) ) {
    print_r($_FILES);exit;
    $tempPath = $_FILES['upload']['tmp_name'];
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'fileUpload'. DIRECTORY_SEPARATOR . $_FILES[ 'upload' ][ 'name' ];
    if(move_uploaded_file( $tempPath, $uploadPath ))
    {

    }
}
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$name = $_POST['name'];
    @$Email = $_POST['Email'];
    @$Address = $_POST['Address'];
    @$UserName = $_POST['UserName'];
    @$Password = $_POST['Password'];
    @$profileimage = $_POST['profileimage'];

    if(isset($request->id))
    {

        @$id = $_POST['id'];

        $result = mysql_query("UPDATE profile set name='$name', email='$Email', address='$Address', username='$UserName', password='$Password', profileoic='".$_FILES['upload']['name']."' WHERE user_id='$id'")
        or die(mysql_error());
        $answer = array( 'answer' => 'Information Updated...' );
        $json = json_encode( $answer );
    }
    else
    {
        if(!empty($_FILES)){
            $filename = $_FILES['upload']['name'];
        } else {
            $filename = $_POST['path'];
        }
        $result = mysql_query("INSERT INTO profile (name, email, address, username, password, profileoic) VALUES ('$name' , '$Email', '$Address', '$UserName', '$Password', '".$filename."')")
        or die(mysql_error());
        $answer = array( 'answer' => 'Information Saved...' );
        $json = json_encode( $answer );
    }

    echo $json;



?>