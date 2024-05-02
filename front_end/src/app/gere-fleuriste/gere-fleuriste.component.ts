import { Component, OnInit } from '@angular/core';
import { GereFleuristeService } from '../gere-fleuriste.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';


@Component({
  selector: 'app-gere-fleuriste',
  templateUrl: './gere-fleuriste.component.html',
  styleUrls: ['./gere-fleuriste.component.css'],
  standalone:true,
  imports:[HttpClientModule,CommonModule,RouterLink]
})
export class GereFleuristeComponent implements OnInit {
  constructor(public fs: GereFleuristeService) { }

  fleurists : any = [];
  id: number | undefined;
  
  ngOnInit() {
    this.fs.getAllFleuriste().subscribe({
      next: (respons) => {
        this.fleurists = respons;

      },
      error: (error) => {
        console.error("Erreur lors de la récupération de données:", error);
        alert("Une erreur s'est produite lors de la récupération des données");
      }}
    );
  }

 supprimeFleurist(id: number): void {
    if (id) {
        this.fs.supprimeFleurist(id).subscribe({
            next: (response) => {
                // Filtrer les fleuristes après la suppression
                this.fleurists = this.fleurists.filter((f: any) => f.id_fleuriste !== id);
                alert("Le fleuriste a été supprimé avec succès");
                // Réinitialiser l'ID après la suppression
                this.id = undefined;
                // Afficher l'identifiant après la suppression
                console.log(id);
                console.log(response);
            },
            error: (error) => {
                console.error("Erreur lors de la suppression du fleuriste:", error);
                alert("Une erreur s'est produite lors de la suppression du fleuriste");
            }
        });
    } else {
        console.error("L'identifiant du fleuriste est indéfini");
        alert("Une erreur s'est produite lors de la suppression du fleuriste");
    }
}

  
  
  
}


 