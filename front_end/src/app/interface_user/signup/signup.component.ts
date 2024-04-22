import { Component } from '@angular/core';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface userObjet {
  
  nom_marie: string;
  mail: string;
  budget: number;
  nbr_invite: number;
  date_mariage: string;
  mot_passe: string;
  ville: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: userObjet = {
    nom_marie: '',
     mail: '',
     budget: 0,
     nbr_invite: 0,
     date_mariage: '',
     mot_passe: '',
     ville:'',
   };
   userAjoute: boolean = false;

   constructor(private router: Router,public i:SignupService){}
   ngOnInit(): void {
   
   }
   createuser(): void {
    const nouveauuser = {
    nom_marie: this.user.nom_marie,
      mail: this.user.mail,
      budget: this.user.budget,
      nbr_invite: this.user.nbr_invite,
      date_mariage: this.user.date_mariage,
      mot_passe: this.user.mot_passe,
      ville:this.user.ville
    };

    this.i.createuser(nouveauuser).subscribe({
      next: (response) => {
        console.log(nouveauuser);
        alert("COMPTE CRÉÉ AVEC SUCCÈS");
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du user :", error);
        alert("Une erreur s'est produite lors de l'ajout du user.");
      }
    });
  }
  request(): void {
    console.log("Request button clicked");
  }

}
