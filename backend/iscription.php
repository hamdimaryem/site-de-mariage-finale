<?php
switch($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        createuser();
        break;
    default:
        echo "Méthode HTTP non supportée.";
}

function createuser() {
    require_once("connexion.php"); 

    $donnees = json_decode(file_get_contents('php://input'), true);
    $date_mariage = date('Y-m-d', strtotime($donnees['date_mariage']));

    $requete = "INSERT INTO user (nom_marie, mail, date_mariage, nbr_invite, mot_passe, budget, ville) 
                VALUES (:nom_marie, :mail, :date_mariage, :nbr_invite, :mot_passe, :budget, :ville)";
    $prepared = $connexion->prepare($requete);
    $prepared->bindParam(':nom_marie', $donnees['nom_marie']);
    $prepared->bindParam(':mail', $donnees['mail']);
    $prepared->bindParam(':date_mariage', $date_mariage); 
    $prepared->bindParam(':mot_passe', $donnees['mot_passe']);
    $prepared->bindParam(':budget', $donnees['budget']);
    $prepared->bindParam(':nbr_invite', $donnees['nbr_invite']);
    $prepared->bindParam(':ville', $donnees['ville']);

    $resultat = $prepared->execute();

    if($resultat !== false) {
        http_response_code(201); 
        $msg = array("message"=> "USER créé avec succès"); 
        echo json_encode($msg);
    } else {
        http_response_code(400); 
        $msg = array("erreur"=> "Erreur lors de la création du USER", "details" => $prepared->errorInfo()); 
        echo json_encode($msg);
    }
    
}
?>
