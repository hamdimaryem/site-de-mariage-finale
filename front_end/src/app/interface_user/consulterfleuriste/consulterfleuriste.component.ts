

import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FleuristeService } from './consulterfleuriste.service';

@Component({
  selector: 'app-consulterfleuriste',
  templateUrl: './consulterfleuriste.component.html',
  styleUrls: ['./consulterfleuriste.component.css'],
  standalone:true,
  imports:[HttpClientModule,CommonModule,RouterLink]

})

export class ConsulterFleuristeComponent implements OnInit {
  constructor(public cf:FleuristeService ) { }

  fleurists: any = [];
  ngOnInit() {
    this.cf.getFleuristes().subscribe({
      next: (response) => {
        this.fleurists = response;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération de données:", error);
        alert("Une erreur s'est produite lors de la récupération des données");
      }}
    );
  }

  contacterFleuriste(id_fleuriste: number) {
    this.cf.getFleuristeContactInfo(id_fleuriste).subscribe((contactInfo: any) => {
      console.log(contactInfo); // Afficher les informations de contact dans une fenêtre modale
    });
  }

  confirmerFleuriste(id_fleuriste: number, id_mariage: number) {
    this.cf.selectFleuriste(id_fleuriste, id_mariage).subscribe((response: any) => {
      console.log(response); // Afficher un message de confirmation
    });
  }
}
