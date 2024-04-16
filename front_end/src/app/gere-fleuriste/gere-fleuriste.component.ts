import { Component, OnInit } from '@angular/core';
import { GereFleuristeService } from '../gere-fleuriste.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { error } from 'node:console';

@Component({
  selector: 'app-gere-fleuriste',
  templateUrl: './gere-fleuriste.component.html',
  styleUrls: ['./gere-fleuriste.component.css'],
  standalone:true,
  imports:[HttpClientModule,CommonModule,RouterLink]
})
export class GereFleuristeComponent implements OnInit {
  constructor(public fs: GereFleuristeService) { }

  fleurists: any = [];
  
  ngOnInit() {
    this.fs.getAllFleuriste().subscribe({
      next: (response) => {
        this.fleurists = response;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération de données:", error);
        alert("Une erreur s'est produite lors de la récupération des données");
      }}
    );
  }

  supprimeFleurist(id: any) {
    this.fs.supprimeFleurist(id).subscribe({
      next:(response) => {
        console.log(response);
      },
      error: (error) => {
        console.error("Erreur lors de la suppression du fleuriste:", error);
        alert("Une erreur s'est produite lors de la suppression du fleuriste");
      }}
    );
  }
}


 
