<?php

require_once('connexion.php');
require_once('vendor/autoload.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$config=require_once('config.php');

$secret_key = $config['jwt_secret'];
$headers=apache_request_headers();

if(isset($headers['Authorization'])){
    $authorizationHeader=$headers['Authorization'];
    //print_r($authorizationHeader);
    $headerValue=explode(' ',$authorizationHeader);

    $jwt= $headerValue[1];
    try{
        $decoded=JWT::decode($jwt,new Key($secret_key,'HS256'));
        echo json_encode(array("success" => true, "message" => "Token JWT valide.", "data" => $decoded ));
        //print_r($decoded);
    }
    catch(Exception $e){
        http_response_code(204);
        echo json_encode(array("success" => false, "message" => "Token JWT invalide.", "error" => $e->getMessage()));
    }
    
}else{
    http_response_code(204);
    echo json_encode(array("success" => false, "message" => "Pas de Authorization header"));
    //echo "Pas de Authorization header";
}
?>