import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MariageService {
  url: string = "http://localhost/api/mariage.php";

  constructor(public http: HttpClient) { }


  getmaraige(id: any) {
    return this.http.get("'${this.url}?id_user=${id}'");
  }


}



