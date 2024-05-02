<?php
require_once('connexion.php');
require_once('vendor/autoload.php');

use Firebase\JWT\JWT;

$config=require_once('config.php');

$secret_key = $config['jwt_secret'];

$input_data = json_decode(file_get_contents('php://input'), true);

if (isset($input_data['mail']) && isset($input_data['password'])) {
    $mail = $input_data['mail'];
    $password = $input_data['password'];

    $sql = "SELECT mail, password,role,id_personne FROM personne WHERE mail = '$mail'";
    $stmt = $connexion->query($sql);

    $personne = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($personne && $personne['password']===$password) {
        $payload=array(
            'iss'=>'notre_site_de_mariage',
            'iat'=>time(),
            'exp'=>strtotime("+1 hour"),
            'mail' => trim($personne['mail']),
            'password'=>$personne['password'],
            'role'=>$personne['role'],
            'id_personne'=>$personne['id_personne']
        );
        $jwt = JWT::encode($payload, $secret_key,'HS256');

        echo json_encode(array("success" => true, "message" => "Authentication successful", "token" => $jwt));
    } else {
        http_response_code(204);
        echo json_encode(array("success" => false, "message" => "Echec de l'authentification."));
    }
} else {
    http_response_code(204);
    echo json_encode(array("success" => false, "message" => "Donnees JSON invalides."));
}
?>