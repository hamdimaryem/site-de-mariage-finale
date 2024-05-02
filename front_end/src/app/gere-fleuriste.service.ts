
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GereFleuristeService {
  url: string = "http://localhost/api/fleuriste.php";


  constructor(public http: HttpClient) { }

  getAllFleuriste() {
    return this.http.get(this.url);
  }
  createFleuriste(noveaufleuriste: any){

    return this.http.post(this.url,noveaufleuriste);
  }
  supprimeFleurist(id: number): Observable<any> {
    console.log(id);
    const deleteUrl = `${this.url}?id_fleuriste=${id}`;
    return this.http.delete(deleteUrl);
  }
  
  // Nouvelle méthode pour obtenir un fleuriste par ID
  getFleuriste(id: number): Observable<any> {
    const fleuristeUrl = `${this.url}?id_fleuriste=${id}`; // URL avec le paramètre d'identifiant
    return this.http.get(fleuristeUrl); // Récupérer le fleuriste par ID
  }
  modifierFleuriste(nouveauFleuriste: any) {
    console.log("hey");
    return this.http.put(this.url, nouveauFleuriste);
  }
}

