<?php
// Chargez les dépendances nécessaires
require_once('connexion.php');
require_once('vendor/autoload.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Charger la clé secrète
$config = require_once('config.php');
$secret_key = $config['jwt_secret'];

// Récupérer les en-têtes de la requête
$headers = apache_request_headers();

if (isset($headers['Authorization'])) {
    // Extraire le token JWT de l'en-tête 'Authorization'
    $authorizationHeader = $headers['Authorization'];
    $jwt = str_replace('Bearer ', '', $authorizationHeader);

    try {
        // Décoder le JWT
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $id_personne = $decoded->id_personne;

        // Préparer et exécuter la requête SQL pour récupérer le budget, la date du mariage, et le nombre d'invités
        $sql = "SELECT 
        u.budget, 
        u.date_mariage, 
        u.nbr_invites, 
        f.nom AS nom_fleuriste,
        f.prix AS prix_fleuriste
      FROM 
        user u
      INNER JOIN 
        fleuriste f 
      ON 
        u.id_fleuriste = f.id_fleuriste 
      WHERE 
        u.id_personne = :id_personne;";

        $stmt = $connexion->prepare($sql);
        $stmt->bindParam(':id_personne', $id_personne, PDO::PARAM_INT);
        $stmt->execute();

        $resultat = $stmt->fetch(PDO::FETCH_ASSOC);

        header('Content-Type: application/json'); // Définir le type de contenu de la réponse

        if ($resultat === false) {
            http_response_code(204); // Code HTTP pour "Non trouvé"
            echo json_encode(array("erreur" => "Utilisateur inexistant"));
        } else {
            echo json_encode($resultat); // Retourner les données au format JSON
        }
    } catch (Exception $e) {
        // Gérer les exceptions lors du décodage du JWT
        http_response_code(201); // Code HTTP pour "Non autorisé"
        echo json_encode(array("erreur" => "Token JWT invalide", "détails" => $e->getMessage())); 
    }
} else {
    // Si l'en-tête 'Authorization' est absent
    http_response_code(201); // Code HTTP pour "Non autorisé"
    echo json_encode(array("erreur" => "Le header 'Authorization' est manquant"));
}
?>
