<?php
switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if(isset($_GET["id_user"])) {
            getmaraige($_GET["id_user"]);
        } else {
            echo "Erreur : l'identifiant de l'utilisateur est manquant.";
        }
        break;
   default:
        echo "Méthode HTTP non supportée.";
}

function getmaraige($id_user)
{   
    // Etape 1 : préparation de la requête
    $requete = "SELECT budget, date_mariage, nbr_invite FROM user WHERE id_user = $id_user";

    // Etape 2 : connexion avec la base de données, création de l'objet connexion
    require_once("connexion.php");
    // Etape 3: exécuter la requête
    $statement = $connexion->query($requete);
    // Etape 4 : récupérer le résultat sous forme associative
    $resultat = $statement->fetch(PDO::FETCH_ASSOC);
    // Ajouter l'entête pour spécifier le format retourné par le fichier
    header('Content-type: application/json');
    // Si pas de produits
    if($resultat == null)
    {
        http_response_code(204);
        $msg = array("erreur" => "user inexistant");
        // Encodage du message d'erreur en JSON et affichage
        echo json_encode($msg);
    }
    else
    { 
        // Etape 5 : renvoyer les données dans un tableau associatif
        $mariage = array(
            "budget" => $resultat["budget"],
            "date_mariage" => $resultat["date_mariage"],
            "nbr_invite" => $resultat["nbr_invite"]
        );
        // Afficher les données JSON
        echo json_encode($mariage);
    }
}
?>
