import { Component } from '@angular/core';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface userObjet {
  
  nom: string;
  mail: string;
  budget: number;
  nbr_invite: number;
  date_mariage: string;
  password: string;
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
    nom: '',
     mail: '',
     budget: 0,
     nbr_invite: 0,
     date_mariage: '',
     password: '',
     ville:'',
   };
   userAjoute: boolean = false;

   constructor(private router: Router,public i:SignupService){}
   ngOnInit(): void {
   
   }
   createuser(): void {
    const { nom, mail, budget, nbr_invite, date_mariage, password, ville } = this.user;

    // Vérifiez que tous les champs sont remplis
    if (!nom || !mail || !budget || !nbr_invite || !date_mariage || !password || !ville) {
      alert("Tous les champs doivent être remplis.");
      return; // Arrêtez la fonction si des champs sont vides
    }
    // Vérifiez que le mot de passe a au moins 8 caractères, une lettre majuscule et une lettre minuscule
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Au moins 8 caractères, avec des lettres minuscules et majuscules

    if (!passwordRegex.test(password)) {
      alert("Le mot de passe doit avoir au moins 8 caractères, incluant des lettres minuscules et majuscules.");
      return; // Arrêtez la fonction si le mot de passe n'est pas conforme
    }


    const nouveauuser = {
    nom: this.user.nom,
      mail: this.user.mail,
      budget: this.user.budget,
      nbr_invite: this.user.nbr_invite,
      date_mariage: this.user.date_mariage,
      password: this.user.password,
      ville:this.user.ville
      
    };
   

    this.i.createuser(nouveauuser).subscribe({
      next: (_response) => {
        this.userAjoute=true;

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
