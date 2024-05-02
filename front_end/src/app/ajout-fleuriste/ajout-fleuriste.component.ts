import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
;import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';;
import { GereFleuristeService } from '../gere-fleuriste.service';



interface FleuristObjet {
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
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class AjoutFleuristeComponent implements OnInit {
  fleurists: FleuristObjet = {
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

  ngOnInit(): void {}

  createFleuriste(): void {
    const { nom, localisation, avis, prix, mail, num_tel, service } = this.fleurists;

    // Vérifiez que tous les champs obligatoires sont remplis
    if (!nom || !localisation || !avis || !prix || !mail || !num_tel || !service) {
      alert("Vous devez remplir tous les champs.");
      return; // Arrêtez la fonction si des champs sont vides
    }
    // Vérifiez que l'avis est entre 0 et 5
    if (avis < 0 || avis > 5) {
      alert("L'avis doit être compris entre 0 et 5");
      return; // Arrêtez la fonction si l'avis n'est pas valide
    }
    if (num_tel.length !== 8) {
      alert("Le numéro de téléphone doit avoir 8 chiffres.");
      return; 
    }


    const nouveauFleuriste = {
      nom,
      localisation,
      avis,
      prix,
      mail,
      num_tel,
      service,
    };

    this.fs.createFleuriste(nouveauFleuriste).subscribe({
      next: (response) => {
        this.fleuristeAjoute = true;
        console.log(response);
        alert("Fleuriste ajouté avec succès.");
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du fleuriste :", error);
        alert("Une erreur s'est produite lors de l'ajout du fleuriste.");
      },
    });
  }

  request(): void {
    console.log("Request button clicked");
  }
}
