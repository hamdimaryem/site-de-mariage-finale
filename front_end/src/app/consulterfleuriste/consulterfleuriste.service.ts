import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { AuthService } from '../authentification/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FleuristeService {
   baseUrl = 'http://localhost/api/consulterfleuriste.php';
   //public token: string = 'jwtToken';

// Récupérez le token de manière appropriée depuis votre application

  constructor(public http: HttpClient,public authService: AuthService ) { }

  getFleuristes() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const options = { headers };

        return this.http.get(this.baseUrl, options);
      } else {
        console.error("Token non trouvé dans localStorage");
        return null;
      }
    } else {
      console.error("localStorage n'est pas disponible");
      return null;
    }
  }
  confirmerFleuriste(id_fleuriste: number, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}`, { id_fleuriste }, { headers });
    
  }
}
  
    
     
  

  /* Récupérer les informations de contact d'un fleuriste
  getFleuristeContactInfo(id_fleuriste: number) {
  
   return this.http.get(`${this.baseUrl}/${id_fleuriste}`);
  
 }

   Sélectionner un fleuriste pour un mariage
  selectFleuriste(id_fleuriste: number, id_user: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(`${this.baseUrl1}?id_fleuriste=${id_fleuriste}&id_mariage=${id_user}`, {}, { headers: headers });
  }
   
}*/

