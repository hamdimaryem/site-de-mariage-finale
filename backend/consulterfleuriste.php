<?php
//var_dump($_SERVER);
require_once('vendor/autoload.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$config = require_once('config.php');
$secret_key = $config['jwt_secret'];
$headers = apache_request_headers();

function getFleuristeseloncritere($id_user, $critere)
{
    global $connexion;
    $sql = "SELECT id_fleuriste, nom, localisation, avis, prix, service FROM fleuriste 
            WHERE prix < (SELECT budget * 0.1 FROM user WHERE id_user = :id_user) 
            AND localisation = (SELECT ville FROM user WHERE id_user = :id_user)
            AND service = :critere  ORDER BY prix ASC, avis DESC";
    require_once("connexion.php");
    $stmt = $connexion->prepare($sql);
    $stmt->bindParam(':id_user', $id_user['id_user']);
    $stmt->bindParam(':critere', $critere); 

    $stmt->execute();
    $resultat = $stmt->fetchALL(PDO::FETCH_ASSOC);
    header('Content-type:application/json');

    if ($resultat == null) {
        http_response_code(500);
        $msg = array("erreur" => "Fleuriste inexistant");
        json_encode($msg);
    } else {
        $json = json_encode($resultat);
        echo $json;
    }
}

function getFleuriste($id_user)
{

    global $connexion;
    //$sql = "SELECT image, nom, localisation, avis, prix, service FROM fleuriste WHERE prix < (SELECT budget * 0.1 FROM user WHERE id_personne = :id_personne) AND localisation = (SELECT ville FROM user WHERE id_personne = :id_personne)  ORDER BY prix ASC, avis DESC";
    $sql = "SELECT id_fleuriste,nom, localisation, avis, prix, service,mail,num_tel FROM fleuriste WHERE prix < (SELECT budget * 0.1 FROM user WHERE id_user = :id_user) AND localisation = (SELECT ville FROM user WHERE id_user = :id_user)  ORDER BY prix ASC, avis DESC";
    require_once("connexion.php");
    $stmt = $connexion->prepare($sql);
    $stmt->bindParam(':id_user', $id_user['id_user']);
    $stmt->execute();
    //$stmt = $connexion->query($sql);
    $resultat = $stmt->fetchALL(PDO::FETCH_ASSOC);
    header('Content-type:application/json') ;
    //$stmt->execute();

    // Vérifier s'il y a des résultats
    if($resultat==null)
    {
        http_response_code(204);
        $msg = array("erreur"=> "Fleuriste inexistant");
        json_encode($msg);
    }
    else
    { //Etape 5 : convertir les données en json
        $json = json_encode($resultat);
        //afficher les données json
        echo $json;
    }
}

function confirmerFleuriste($id_user)
{

    global $connexion;
    // Récupération des données de la requête POST
    $data = json_decode(file_get_contents("php://input"),true);

    if (isset($data['id_fleuriste']) /*&& !empty($data->id_user)*/) {
        $id_fleuriste=$data['id_fleuriste'];

        $sql = "UPDATE user SET id_fleuriste = :id_fleuriste WHERE id_user = :id_user";
        require_once("connexion.php");
        $stmt = $connexion->prepare($sql);

        $stmt->bindParam(':id_fleuriste', $id_fleuriste);
        $stmt->bindParam(':id_user', $id_user['id_user']);


        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(array("message" => "Le fleuriste a été mis à jour avec succès pour le mariage."));
        } else {
            http_response_code(204); // Not Found
            echo json_encode(array("message" => "L'identifiant du fleuriste n'existe pas."));
        }
    } else {
        http_response_code(204); // Bad Request
        echo json_encode(array("message" => "Des données incomplètes. Assurez-vous de fournir id_fleuriste."));
    }
}



if (isset($headers['Authorization'])) {
    $authorizationHeader = $headers['Authorization'];
    /*$headerValue=explode(' ',$authorizationHeader);

    $token = $headerValue[1];*/
    $token = str_replace('Bearer ', '', $headers['Authorization']);

        try {
            //$decoded = JWT::decode($token, $secret_key, array('algorithm' => 'HS256'));
            $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));

            $id_personne = $decoded->id_personne;


            //le code etait fonctionnel sans ce bout de code
            $requete = "SELECT id_user FROM user WHERE id_personne=:id_personne";
            require_once('connexion.php');
            $stmt = $connexion->prepare($requete);
            $stmt->bindParam(':id_personne', $id_personne);
            $stmt->execute();
            //$stmt = $connexion->query($requete);
            $id_user = $stmt->fetch(PDO::FETCH_ASSOC);
            header('Content-type:application/json') ;
            //$id_user = $result['id_user'];

            if($id_user==null)
            {
                http_response_code(204);
                $msg = array("erreur"=> "User inexistant");
                json_encode($msg);
            }
            else
            { //Etape 5 : convertir les données en json
                $json = json_encode($id_user);
                //afficher les données json
                //echo $json;
            }


            switch ($_SERVER['REQUEST_METHOD']) {
                case 'GET':
                    if (isset($_GET["critere"])) {
                        getFleuristeseloncritere($id_user, $_GET["critere"]);
                        
                    } else {
                        getFleuriste($id_user);
                    }
                    break;
                case 'POST':
                    confirmerFleuriste($id_user);
                    break;
                default:
                    http_response_code(204); // Method Not Allowed
                    echo json_encode(array("message" => "Methode non autorisee."));
                    break;
            }
        } catch (Exception $e) {
            // En cas d'erreur de décodage du token
            http_response_code(204); // Unauthorized
            echo json_encode(array("success" => false, "message" => "Acces non autorise.", "error" => $e->getMessage()));
        }
}else{
        // En cas d'absence d'en-tête d'autorisation
        http_response_code(204); // Unauthorized
        echo json_encode(array("success" => false, "message" => "Acces non autorise. En-tete d'autorisation manquant."));
}


?>