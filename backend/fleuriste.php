<?php
switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET':
        if($_GET["id_fleuriste"]==null)
         getAllFleuriste();
        else
            getFleuriste($_GET["id_fleuriste"]);
        break;
        case 'POST':
            createFleuriste();
            break;
    
        case 'PUT':
            updateFleuriste();
            break;
    
        case 'DELETE':
            deleteFleuriste();
            break;    
}

function getAllFleuriste()
{
    //Etape 1 : préparation de la requête
    $requete ="SELECT * from fleuriste ";
    //Etape 2 : connexion avec la base de données, création de l'objet connexion
    require_once("connexion.php");
    //Etape 3: exécuter la requête
    $statement = $connexion->query($requete);
    //Etape 4 : récupérer le résultat sous forme associative
    $resultat = $statement->fetchAll(PDO::FETCH_ASSOC);     //taqrahom cle valeurr "FETCH_ASSOC)"
    //ajouter l'entête pour spécifier le format retourné par le fichier
    header('Content-type:application/json') ;
    //si pas de produits
    if($resultat==null)
    {
        http_response_code(204);
        $msg = array("erreur"=> "pas de fleuristes");
        json_encode($msg);
    }
    else
    { //Etape 5 : convertir les données en json
        $json = json_encode($resultat);
        //afficher les données json
        echo $json;
    }
}

function getFleuriste($id)
{   
    //Etape 1 : préparation de la requête
    $requete ="SELECT * from fleuriste where id_fleuriste = $id ";
    //Etape 2 : connexion avec la base de données, création de l'objet connexion
    require_once("connexion.php");
    //Etape 3: exécuter la requête
    $statement = $connexion->query($requete);
    //Etape 4 : récupérer le résultat sous forme associative
    $resultat = $statement->fetch(PDO::FETCH_ASSOC);
    //ajouter l'entête pour spécifier le format retourné par le fichier
    header('Content-type:application/json') ;
    //si pas de produits
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
function createFleuriste() {
    require_once("connexion.php"); 

    // Récupérer les données du corps de la requête POST
    $donnees = json_decode(file_get_contents('php://input'), true);

    // Écrire le code pour insérer un nouveau fleuriste dans la base de données
    // Utilisez les données récupérées du corps de la requête pour cela

    $requete = "INSERT INTO fleuriste (id_fleuriste, nom, mail, num_tel, localisation, avis, prix, service) VALUES (:id, :nom, :mail, :num_tel, :localisation, :avis, :prix, :service)";
    $prepared = $connexion->prepare($requete);
    $prepared->bindParam(':id', $donnees['id_fleuriste']);
    $prepared->bindParam(':nom', $donnees['nom']);
    $prepared->bindParam(':mail', $donnees['mail']);
    $prepared->bindParam(':num_tel', $donnees['num_tel']);
    $prepared->bindParam(':localisation', $donnees['localisation']);
    $prepared->bindParam(':avis', $donnees['avis']);
    $prepared->bindParam(':prix', $donnees['prix']);
    $prepared->bindParam(':service', $donnees['service']);

    $resultat = $prepared->execute();

    if($resultat !== false) {
        http_response_code(201); 
        $msg = array("message"=> "Fleuriste créé avec succès"); 
        echo json_encode($msg);
    } else {
        http_response_code(400); 
        $msg = array("erreur"=> "Erreur lors de la création du fleuriste"); 
        echo json_encode($msg);
    }
}


function updateFleuriste() {
    require_once("connexion.php"); 

    // Récupérer les données du corps de la requête PUT
    $donnees = json_decode(file_get_contents('php://input'), true);

    if(isset($donnees['id_fleuriste'])) {
        $id = $donnees['id_fleuriste'];

        // Initialiser un tableau pour stocker les champs à mettre à jour
        $champs_a_mettre_a_jour = array();
        $valeurs_a_mettre_a_jour = array();

        // Vérifier et ajouter les champs à mettre à jour dans le tableau
        if(isset($donnees['nom'])) {
            $champs_a_mettre_a_jour[] = "nom=:nom";
            $valeurs_a_mettre_a_jour[':nom'] = $donnees['nom'];
        }

        if(isset($donnees['mail'])) {
            $champs_a_mettre_a_jour[] = "mail=:mail";
            $valeurs_a_mettre_a_jour[':mail'] = $donnees['mail'];
        }

        if(isset($donnees['num_tel'])) {
            $champs_a_mettre_a_jour[] = "num_tel=:num_tel";
            $valeurs_a_mettre_a_jour[':num_tel'] = $donnees['num_tel'];
        }

        if(isset($donnees['localisation'])) {
            $champs_a_mettre_a_jour[] = "localisation=:localisation";
            $valeurs_a_mettre_a_jour[':localisation'] = $donnees['localisation'];
        }

        if(isset($donnees['prix'])) {
            $champs_a_mettre_a_jour[] = "prix=:prix";
            $valeurs_a_mettre_a_jour[':prix'] = $donnees['prix'];
        }

        if(isset($donnees['avis'])) {
            $champs_a_mettre_a_jour[] = "avis=:avis";
            $valeurs_a_mettre_a_jour[':avis'] = $donnees['avis'];
        }

        if(isset($donnees['service'])) {
            $champs_a_mettre_a_jour[] = "service=:service";
            $valeurs_a_mettre_a_jour[':service'] = $donnees['service'];
        }

        // Construire la partie SET de la requête SQL en fonction des champs à mettre à jour
        $champs_a_mettre_a_jour_sql = implode(", ", $champs_a_mettre_a_jour);

        if(!empty($champs_a_mettre_a_jour_sql)) {
            // Écrire le code pour mettre à jour les champs spécifiés du fleuriste dans la base de données
            $requete = "UPDATE fleuriste SET $champs_a_mettre_a_jour_sql WHERE id_fleuriste=:id";
            $prepared_update = $connexion->prepare($requete);

            // Liaison des paramètres
            foreach ($valeurs_a_mettre_a_jour as $nom_parametre => $valeur_parametre) {
                $prepared_update->bindParam($nom_parametre, $valeur_parametre);
            }
            $prepared_update->bindParam(":id", $id);

            // Exécution de la requête préparée
            if($prepared_update->execute()) {
                http_response_code(200); 
                $msg = array("message"=> "Fleuriste mis a jour avec succes"); 
                echo json_encode($msg);
            } else {
                http_response_code(500); 
                $msg = array("erreur"=> "Erreur lors de la mise a jour du fleuriste"); 
                echo json_encode($msg);
            }
        } else {
            // Si aucun champ à mettre à jour n'a été spécifié
            http_response_code(204); 
            $msg = array("erreur"=> "Aucun champ à mettre a jour specifie"); 
            echo json_encode($msg);
        }
    } else {
        // Si l'ID est manquant dans les données
        http_response_code(204); 
        $msg = array("erreur"=> "ID manquant pour la mise a jour du fleuriste"); 
        echo json_encode($msg);
    }
}


function deleteFleuriste() {
    require_once("connexion.php"); 

    //$donnees = json_decode(file_get_contents('php://input'), true);
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id_fleuriste']; // Pas besoin de json_encode ici

    // Écrire le code pour supprimer un fleuriste existant de la base de données
    // Utilisez l'ID récupéré pour cela
    $requete = "DELETE FROM fleuriste WHERE id_fleuriste = $id";
    $resultat = $connexion->exec($requete);

    if($resultat !== false) {
        http_response_code(200); // Utilisez 200 pour indiquer le succès
        $msg = array("message"=> "Fleuriste supprimé avec succès"); 
        echo json_encode($msg);
    } else {
        http_response_code(500); // Utilisez 500 pour les erreurs de serveur
        $msg = array("erreur"=> "Erreur lors de la suppression du fleuriste"); 
        echo json_encode($msg);
    }
}

?>