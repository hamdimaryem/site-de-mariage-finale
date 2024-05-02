import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MariageService {
 public baseUrl = 'http://localhost/api/get_mariage_details.php'; // URL de l'API pour obtenir les détails du mariage

  constructor(public http: HttpClient) {}

  getmariage() {
    // Vérifier si localStorage est disponible
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        // Créer les en-têtes avec le token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // Créer les options de requête avec les en-têtes
        const options = { headers };

        // Effectuer la requête HTTP avec les options
        return this.http.get(this.baseUrl, options);
      } else {
        // Si aucun token n'est disponible, afficher une alerte ou gérer l'erreur
        console.error("Token non trouvé dans localStorage");
        // Retourner une valeur par défaut ou gérer l'erreur d'une autre manière
        // Dans ce cas, nous retournons null, mais vous pouvez choisir une autre approche
        return null;
      }
    } else {
      // Si localStorage n'est pas disponible, afficher une alerte ou gérer l'erreur
      console.error("localStorage n'est pas disponible");
      // Retourner une valeur par défaut ou gérer l'erreur d'une autre manière
      // Dans ce cas, nous retournons null, mais vous pouvez choisir une autre approche
      return null;
    }
  }
}  