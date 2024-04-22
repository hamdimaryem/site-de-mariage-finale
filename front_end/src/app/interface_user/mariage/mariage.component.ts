import { Component, OnInit } from '@angular/core';
import { MariageService } from './mariage.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-mariage',
  templateUrl: './mariage.component.html',
  styleUrls: ['./mariage.component.css']
})
export class MariageComponent implements OnInit {
  id_user: number = 47;
  mariage: any = [];

  constructor(private m: MariageService) {}

  ngOnInit() {
    this.getMariage(this.id_user);
  }

  getMariage(id_user: any) {
    this.m.getmaraige(id_user).subscribe({
      next: (response) => {
        this.mariage = response;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération de données:", error);
        
      }
    });
  }
}
