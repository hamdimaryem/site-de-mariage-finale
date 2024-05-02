
<?php
switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET':
            if (!isset($_GET["id_fleuriste"]) || $_GET["id_fleuriste"] == null) {
                getAllFleuriste();
            } else {
                getFleuriste($_GET["id_fleuriste"]);
            }
            
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
  
    // Vérifier que les données requises ont été fournies
    if ( !isset($donnees['nom']) || !isset($donnees['mail']) || !isset($donnees['num_tel']) || !isset($donnees['localisation']) || !isset($donnees['avis']) || !isset($donnees['prix']) || !isset($donnees['service'])) {
      http_response_code(400); 
      $msg = array("erreur"=> "Tous les champs sont requis"); 
      echo json_encode($msg);
      exit();
    }
  
    // Écrire le code pour insérer un nouveau fleuriste dans la base de données
    // Utilisez les données récupérées du corps de la requête pour cela
  
    $requete = "INSERT INTO fleuriste ( nom, mail, num_tel, localisation, avis, prix, service) VALUES ( :nom, :mail, :num_tel, :localisation, :avis, :prix, :service)";
    $prepared = $connexion->prepare($requete);
   
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
          $msg = array("erreur"=> "Erreur lors de la création du fleuriste 1 "); 
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

        // Vérifier si le nom est présent dans les données
        if(isset($donnees['nom'])) {
            $nom = $donnees['nom'];
            $champs_a_mettre_a_jour[] = "nom='$nom'";
        }

        // Vérifier si le mail est présent dans les données
        if(isset($donnees['mail'])) {
            $mail = $donnees['mail'];
            $champs_a_mettre_a_jour[] = "mail='$mail'";
        }

        if(isset($donnees['num_tel'])) {
            $num_tel = $donnees['num_tel'];
            $champs_a_mettre_a_jour[] = "num_tel='$num_tel'";
        }

        if(isset($donnees['localisation'])) {
            $localisation = $donnees['localisation'];
            $champs_a_mettre_a_jour[] = "localisation='$localisation'";
        }

        if(isset($donnees['prix'])) {
            $prix = $donnees['prix'];
            $champs_a_mettre_a_jour[] = "prix='$prix'";
        }

        if(isset($donnees['avis'])) {
            $avis = $donnees['avis'];
            $champs_a_mettre_a_jour[] = "avis='$avis'";
        }

        if(isset($donnees['service'])) {
            $service = $donnees['service'];
            $champs_a_mettre_a_jour[] = "service='$service'";
        }

        // Construire la partie SET de la requête SQL en fonction des champs à mettre à jour
        $champs_a_mettre_a_jour_sql = implode(", ", $champs_a_mettre_a_jour);

        if(!empty($champs_a_mettre_a_jour_sql)) {
            // Écrire le code pour mettre à jour les champs spécifiés du fleuriste dans la base de données
            $requete = "UPDATE fleuriste SET $champs_a_mettre_a_jour_sql WHERE id_fleuriste=$id";
            $resultat = $connexion->exec($requete);

            if($resultat !== false) {
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
            http_response_code(400); 
            $msg = array("erreur"=> "Aucun champ à mettre a jour specifie"); 
            echo json_encode($msg);
        }
    } else {
        // Si l'ID est manquant dans les données
        http_response_code(400); 
        $msg = array("erreur"=> "ID manquant pour la mise a jour du fleuriste"); 
        echo json_encode($msg);
    }
}


function deleteFleuriste() {
    require_once("connexion.php"); 

    //$donnees = json_decode(file_get_contents('php://input'), true);
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id_fleuriste'];
    // Écrire le code pour supprimer un fleuriste existant de la base de données
    // Utilisez l'ID récupéré pour cela
    $requete = "DELETE FROM fleuriste WHERE id_fleuriste = $id";
    $resultat = $connexion->exec($requete);

    if($resultat !== false) {
        http_response_code(200); 
        $msg = array("message"=> "Fleuriste supprime avec succes"); 
        echo json_encode($msg);
    } else {
        http_response_code(500); 
        $msg = array("erreur"=> "Erreur lors de la suppression du fleuriste"); 
        echo json_encode($msg);
    }
}
?>

