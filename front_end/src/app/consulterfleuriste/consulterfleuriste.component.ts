import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FleuristeService } from './consulterfleuriste.service';

@Component({
  selector: 'app-consulterfleuriste',
  templateUrl: './consulterfleuriste.component.html',
  styleUrls: ['./consulterfleuriste.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule],
})
export class ConsulterFleuristeComponent implements OnInit {
  fleuristes: any = [];
  token: string | null = localStorage.getItem('token'); // Récupération du token depuis localStorage
  errorMessage: string = '';

  constructor(public http: HttpClient, public cf: FleuristeService) {}

  ngOnInit() {
    if (this.token) { // Vérification de l'existence du token
      this.getFleuristes();
    } else {
      this.errorMessage = 'Token is null';
      console.error(this.errorMessage);
      // Vous pouvez ajouter un code ici pour rediriger vers la page de connexion ou afficher un message à l'utilisateur
    }
  }

  getFleuristes() {
    if (this.token && this.cf) { // Validation du token et du service
      this.cf.getFleuristes().subscribe({
        next: (response: any) => {
          this.fleuristes = response;
          console.log(this.fleuristes);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des fleuristes', error);
          this.errorMessage = 'Erreur lors de la récupération des fleuristes';
        },
      });
    } else {
      console.error('Token or service is null');
      this.errorMessage = 'Token ou service manquant';
    }
  }

  confirmerFleuriste(id_fleuriste: number) {
    if (this.token && this.cf) { // Validation du token et du service
      this.cf.confirmerFleuriste(id_fleuriste, this.token).subscribe(
        (response: any) => {
          console.log(response);
          alert("confirme");
          // Ajoutez du code ici pour mettre à jour l'interface utilisateur ou afficher un message de succès
        },
        (error) => {
          console.error('Erreur lors de la confirmation du fleuriste', error);
          this.errorMessage = 'Erreur lors de la confirmation du fleuriste';
        }
      );
    } else {
      console.error('Token or service is null');
      this.errorMessage = 'Token ou service manquant';
      // Vous pouvez également rediriger l'utilisateur vers une page de connexion ou afficher un message d'erreur
    }
  }
}

