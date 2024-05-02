import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, NavigationEnd, Event, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


interface personneObjet {
  mail: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  imports :[RouterModule,FormsModule],
  standalone:true 
})
export class AuthentificationComponent {
  personne: personneObjet = {
    mail: '',
    password: '',
    role: ''
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    const nouveauPersonne = {
      mail: this.personne.mail,
      password: this.personne.password,
    };

    this.authService.login(nouveauPersonne).subscribe({
      next: (response) => {
        console.log(response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.validateTokenAndRedirect(response.token);
        } else {
          alert("mot de passe ou Email faux");
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
        if (response && response.data && response.data.role) {
          const role = response.data.role;

          if (role === 'admin') {
            alert(" admin login succsufull")
            this.router.navigate(['/admin_home']);
          } else if (role === 'user') {
            alert(" user  login succsufull")
            this.router.navigate(['/navbar']);
          } else {
            console.error('Unauthorized role:', role);
          }
        } else {
          console.error('Role not found in response');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Token validation failed:', error);
      }
    });
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }
}