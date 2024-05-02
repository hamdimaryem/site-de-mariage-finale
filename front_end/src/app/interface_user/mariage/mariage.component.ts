import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MariageService } from './mariage.service';

@Component({
  selector: 'app-mariage',
  templateUrl: './mariage.component.html',
  styleUrls: ['./mariage.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule]
})
export class MariageComponent implements OnInit {
  mariageDetails: any; // Détails du mariage
  errorMessage: string = ''; // Initialisation avec une chaîne vide
  joursRestants: number | null = null;
  difference: number | null = null; 


  constructor(public http: HttpClient, public mariageService: MariageService) { }

  ngOnInit() {
    this.getMariageDetails();
  }

  // Récupérer les détails du mariage
  getMariageDetails() {
    const mariageObservable = this.mariageService.getmariage();

    if (mariageObservable) {
      mariageObservable.subscribe({
        next: (response) => {
          this.mariageDetails = response;
          this.calculateJoursRestants();  // Stocker les détails du mariage
          console.log(this.mariageDetails);
        },
        error: (error) => {
          this.errorMessage = "Erreur lors de l'affichage des détails du mariage"; 
          console.error(error);
          alert(this.errorMessage);
        }
      });
    } else {
      console.error("Observable des détails du mariage non disponible");
      this.errorMessage = "Impossible de récupérer les détails du mariage.";
    }
  }

  calculateJoursRestants() {
    if (this.mariageDetails && this.mariageDetails.date_mariage) {
      const today = new Date(); // Date actuelle
      const mariageDate = new Date(this.mariageDetails.date_mariage); // Date du mariage
      const diffInMs = mariageDate.getTime() - today.getTime(); // Différence en millisecondes
      this.joursRestants = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Convertir en jours
    } else {
      this.joursRestants = null; // Si la date n'est pas disponible
    }
  }

  calculateDifference() {
    if (typeof this.mariageDetails.budget === 'number' && 
        typeof this.mariageDetails.prix_fleuriste === 'number') {
      this.difference = this.mariageDetails.budget - this.mariageDetails.prix_fleuriste;
    } else {
      this.difference = null;
      console.warn("Les détails du mariage sont incomplets ou invalides.");
    }
  }
  


  }



