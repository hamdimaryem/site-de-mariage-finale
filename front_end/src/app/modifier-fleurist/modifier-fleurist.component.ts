import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GereFleuristeService } from '../gere-fleuriste.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Interface pour le fleuriste
interface FleuristObjet {
  id_fleuriste: number;
  nom: string;
  localisation: string;
  avis: number;
  prix: number;
  mail: string;
  num_tel: string;
  service: string;
}

@Component({
  selector: 'app-modifier-fleurist',
  templateUrl: './modifier-fleurist.component.html',
  styleUrls: ['./modifier-fleurist.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class ModifierFleuristComponent implements OnInit {
  fleurists: FleuristObjet = {
    id_fleuriste: 0, // valeur par défaut
    nom: '',
    localisation: '',
    avis: 0,
    prix: 0,
    mail: '',
    num_tel: '',
    service: '',
  };

  constructor(
    private route: ActivatedRoute, // Injecter ActivatedRoute
    public router: Router,
    private fs: GereFleuristeService
  ) {}

  ngOnInit() {
    // Obtenir l'identifiant du fleuriste à partir des paramètres de requête
    this.route.queryParams.subscribe((params) => {
      const fleuristeId = parseInt(params['fleuristeId'], 10); // Convertir en entier
      if (!isNaN(fleuristeId)) {
        this.fleurists.id_fleuriste = fleuristeId; // Initialiser l'identifiant

        // Charger les détails du fleuriste avec le service
        this.fs.getFleuriste(fleuristeId).subscribe({
          next: (fleuriste: FleuristObjet) => {
            // Remplir les champs avec les données du fleuriste
            this.fleurists.nom = fleuriste.nom;
            this.fleurists.localisation = fleuriste.localisation;
            this.fleurists.avis = fleuriste.avis;
            this.fleurists.prix = fleuriste.prix;
            this.fleurists.mail = fleuriste.mail;
            this.fleurists.num_tel = fleuriste.num_tel;
            this.fleurists.service = fleuriste.service;
          },
          error:(error) => {
            console.error("Erreur lors du chargement des détails du fleuriste :", error);
            alert("Impossible de charger les détails du fleuriste.");
          }}
        );
      }
    });
  }

  annuler() {
    // Logique pour annuler la modification
  }

  modifierFleuriste() {
    this.fs.modifierFleuriste(this.fleurists).subscribe({
      next: () => {
        console.log("Fleuriste modifié avec succès !");
        alert("Fleuriste modifié avec succès !");
      },
      error: (error) => {
        console.error("Erreur lors de la modification du fleuriste :", error);
        alert("Erreur lors de la modification du fleuriste.");
      },
    });
  }
}
