import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
interface personneObjet{
  mail: string ; 
  password: string ; 
  role: string ;

}
@Component({
  selector: 'app-authentification',
  standalone: true,
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  imports: [RouterModule,FormsModule]
})
export class AuthentificationComponent {
 personne: personneObjet = {
  mail: '',
  password: '',
  role:''
 };


  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    const nouveauPersonne = {
      mail: this.personne.mail,
      password: this.personne.password,
    };

    this.authService.login(nouveauPersonne).subscribe({
      next: (response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Stocker le token dans le local storage
          this.validateTokenAndRedirect(response.token);
        } else {
          console.error('No token found in response');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
  validateTokenAndRedirect(token: string): void {
    this.authService.validateToken(token).subscribe({
      next: (response) => {
        console.log(response);
        if (response && response.data && response.data.role) { // Vérifiez que la réponse et le rôle sont définis
          const role = response.data.role;
  
          if (role === 'admin') {
            this.router.navigate(['/HomeAdmin/']);
          } else if (role === 'user') {
            this.router.navigate(['/homeUser/']);
          } else {
            console.error('Unauthorized role:', role);
          }
        } else {
          console.error('Role not found in response');
        }
      },
      error: (error) => {
        console.error('Token validation failed:', error);
      }
    });
  }

  goToSignup(): void {
    this.router.navigate(['/signup/']); // Redirige vers la page d'inscription
  }
}

