import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FleuristeService } from './consulterfleuriste.service';

@Component({
  selector: 'app-consulterfleuriste',
  templateUrl: './consulterfleuriste.component.html'
 ,
  styleUrls: ['./consulterfleuriste.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule]
})
export class ConsulterFleuristeComponent implements OnInit {
  fleuristes: any = [];
  token: string='';

  constructor(public http: HttpClient, public cf: FleuristeService) {}
  

  ngOnInit() {
    if (this.token !== null) {
      this.getFleuristes();
    } else {
      console.error('Token is null');
    }
  }

  getFleuristes() {
    if (this.token !== null  && this.cf !== null) {
      this.cf.getFleuristes().subscribe((response: any) => {
        this.fleuristes = response;
      });
    } else {
      console.error('Token is null');
    }
  }
  

  confirmerFleuriste(id_fleuriste: number) {
    if (this.token !== null  && this.cf !== null) {
      this.cf.confirmerFleuriste(id_fleuriste, this.token).subscribe((response: any) => {
        console.log(response);
        // Mettez à jour ou réagissez en fonction de la réponse de l'API
      });
    } else {
      console.error('Token is null');
    }
  }
}

  
  



  // Fonction pour contacter un fleuriste
/*  contacterFleuriste(fleuriste: any) {
    this.modalService.openContactModal(fleuriste);
  }

  // Fonction pour confirmer un fleuriste pour un mariage
  confirmerFleuriste(id_fleuriste: number, id_user: number) {
    this.cf.selectFleuriste(id_fleuriste, id_user).subscribe((response: any) => {
      console.log(response);
    });
  }
  */


