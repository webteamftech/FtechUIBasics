<?php
    //print_r($_FILES["file"]);die();
    /*
    * All of your application logic with $_FILES["file"] goes here.
    * It is important that nothing is outputted yet.
    */

    // $output will be converted into JSON
    $success = true;
    if ($success) {
        $output = array("success" => true, "message" => "Success!");
    } 
    else {
        $output = array("success" => false, "error" => "Failure!");
    }

    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($output);
?>