<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    createuser();
} else {
    echo "Méthode HTTP non supportée.";
}

function createuser() {
    require_once("connexion.php");
    
    // Vérifier si les données JSON ont été correctement reçues
    $donnees = json_decode(file_get_contents('php://input'));

    // Vérifier si les données requises sont présentes
    if (!isset($donnees->nom) || !isset($donnees->mail) || !isset($donnees->budget) || !isset($donnees->nbr_invite) || !isset($donnees->date_mariage) || !isset($donnees->password) || !isset($donnees->ville)) {
        http_response_code(400); 
        $msg = array("erreur"=> "Tous les champs sont requis"); 
        echo json_encode($msg);
        exit();
    }

    // Convertir la date de mariage au format YYYY-MM-DD
    $date_mariage_obj = DateTime::createFromFormat('Y-m-d', $donnees->date_mariage);
    if (!$date_mariage_obj) {
        http_response_code(400); 
        $msg = array("erreur"=> "Format de date invalide pour la date de mariage"); 
        echo json_encode($msg);
        exit();
    }
    $date_mariage = $date_mariage_obj->format('Y-m-d');

    // Insérer d'abord les données dans la table personne
    $stmt_personne = $connexion->prepare("INSERT INTO personne (nom, mail, role, password) VALUES (:nom, :mail, 'user', :password)");
    $stmt_personne->bindParam(':nom', $donnees->nom);
    $stmt_personne->bindParam(':mail', $donnees->mail);
    $stmt_personne->bindParam(':password', $donnees->password);
    $resultat_personne = $stmt_personne->execute();

    if (!$resultat_personne) {
        http_response_code(400); 
        $msg = array("erreur"=> "Erreur lors de la création du compte utilisateur"); 
        echo json_encode($msg);
        exit();
    }

    // Récupérer l'ID de la personne nouvellement insérée
    $id_personne = $connexion->lastInsertId();

    // Insérer ensuite les données dans la table user
    $stmt_user = $connexion->prepare("INSERT INTO user (id_personne, date_mariage, nbr_invites, budget, ville) VALUES (:id_personne, :date_mariage, :nbr_invite, :budget, :ville)");
    $stmt_user->bindParam(':id_personne', $id_personne);
    $stmt_user->bindParam(':date_mariage', $date_mariage);
    $stmt_user->bindParam(':nbr_invite', $donnees->nbr_invite);
    $stmt_user->bindParam(':budget', $donnees->budget);
    $stmt_user->bindParam(':ville', $donnees->ville);
    $resultat_user = $stmt_user->execute();

    if ($resultat_user) {
        http_response_code(200); 
        $msg = array("message"=> "Utilisateur créé avec succès"); 
        echo json_encode($msg);
    } else {
        http_response_code(400); 
        $msg = array("erreur"=> "Erreur lors de la création de l'utilisateur"); 
        echo json_encode($msg);
    }
}
?>