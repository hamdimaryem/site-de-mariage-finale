

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FleuristeService {
  private baseUrl = 'http://localhost/api/consulterfleuriste';
  private baseUrl1 = 'http://localhost/api/contacterfleuriste';

  constructor(private http: HttpClient) { }

  getFleuristes() {
    return this.http.get(this.baseUrl);
  }

  getFleuristeContactInfo(id_fleuriste: number) {
    return this.http.get(`${this.baseUrl}/${id_fleuriste}`);
  }

  selectFleuriste(id_fleuriste: number, id_mariage: number) {
    return this.http.post(`${this.baseUrl1}?id_fleuriste=${id_fleuriste}&id_mariage=${id_mariage}`, {});
  }
}
