import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  url: string = "http://localhost/api/iscription.php";

  constructor(public http: HttpClient) { }
  createuser(noveauuser: any){

    return this.http.post(this.url,noveauuser);
  }
}
