
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TokenValidationResponse {
  data: {
    mail: string;
  password: string;
  role: string;

  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(nouveauPersonne: any) {
    console.log(nouveauPersonne);

    return this.http.post<any>('http://localhost/api/getjwt.php', nouveauPersonne);
  }

  validateToken(token: string): Observable<TokenValidationResponse> {
    const headers = { 'Authorization': 'Bearer ' + token };

    return this.http.post<TokenValidationResponse>('http://localhost/api/validationjwt.php', {}, { headers });
  }

}