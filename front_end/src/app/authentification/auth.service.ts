import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(nouveauPersonne:any): Observable<any> {
    console.log(nouveauPersonne);
  
    return this.http.post<any>('http://localhost/api/getjwt.php',nouveauPersonne)
  }
  validateToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  
    return this.http.post<any>('http://localhost/api/validationjwt.php', {}, { headers });
  }
  

}

