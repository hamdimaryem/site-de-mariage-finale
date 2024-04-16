import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GereFleuristeService } from '../gere-fleuriste.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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
  selector: 'app-ajout-fleuriste',
  templateUrl: './ajout-fleuriste.component.html',
  styleUrls: ['./ajout-fleuriste.component.css'],
  imports:[FormsModule,CommonModule],
  standalone:true
})
export class AjoutFleuristeComponent implements OnInit {

  fleurists: FleuristObjet = {
    id_fleuriste: 0,
    nom: '',
    localisation: '',
    avis: 0,
    prix: 0,
    mail: '',
    num_tel: '',
    service: '',
  };
  

  fleuristeAjoute: boolean = false;
  avisRange = { min: 0, max: 5 };

  constructor(private router: Router, public fs: GereFleuristeService) {}

  ngOnInit(): void {
   
  }

 

  createFleuriste(): void { {
      const nouveauFleuriste = {
        id_fleuriste: this.fleurists.id_fleuriste,
        nom: this.fleurists.nom,
        localisation: this.fleurists.localisation,
        avis: this.fleurists.avis,
        prix: this.fleurists.prix,
        mail: this.fleurists.mail,
        num_tel: this.fleurists.num_tel,
        service: this.fleurists.service,
      };

      this.fs.createFleuriste(nouveauFleuriste).subscribe({
       next: (response) => {
          //this.fleuristeAjoute = true;
          console.log(response);
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout du fleuriste :", error);
          alert("Une erreur s'est produite lors de l'ajout du fleuriste.");
        }}
      );
    }
  }


  request(): void {
    console.log("Request button clicked");
  }
}

