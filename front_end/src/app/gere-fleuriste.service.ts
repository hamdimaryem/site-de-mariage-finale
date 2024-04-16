
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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
  supprimeFleurist(id:any )
  {
    return this.http.delete(this.url)
  }
  modifierFleuriste(nouveauFleuriste: any) {
    return this.http.put(this.url, nouveauFleuriste);
  }
}

