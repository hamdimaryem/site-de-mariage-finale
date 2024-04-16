import { Component } from '@angular/core';
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
  services: string[];
}
@Component({
  selector: 'app-modifier-fleurist',
  templateUrl: './modifier-fleurist.component.html',
  styleUrls: ['./modifier-fleurist.component.css'],
  standalone:true,
  imports:[FormsModule,CommonModule]
})
export class ModifierFleuristComponent {
  fleurists: FleuristObjet = {
    id_fleuriste: 0,
    nom: '',
    localisation: '',
    avis: 0,
    prix: 0,
    mail: '',
    num_tel: '',
    services: []
  };

  constructor(private router: Router, private fs: GereFleuristeService) {}
  annuler(){

  }
  modifierFleuriste() {
    this.fs.modifierFleuriste(this.fleurists).subscribe(
      () => {
        console.log("Fleuriste modifié avec succès !");
        
      },
      (error) => {
        console.error("Erreur lors de la modification du fleuriste :", error);
    
      }
    );
  }
}

