import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GereFleuristeComponent } from './gere-fleuriste/gere-fleuriste.component';
import { AjoutFleuristeComponent } from './ajout-fleuriste/ajout-fleuriste.component';
import { ModifierFleuristComponent } from './modifier-fleurist/modifier-fleurist.component';
import { NavbarComponent } from './interface_user/navbar/navbar/navbar.component';
import { SignupComponent } from './interface_user/signup/signup.component';
import { MariageService } from './interface_user/mariage/mariage.service';


const routes: Routes = [
  { path: '', component:GereFleuristeComponent},
  { path: '/mariage', component:MariageService},
  { path: '/navbar', component: GereFleuristeComponent },
  { path: '/ajout-fleuriste', component: AjoutFleuristeComponent },
  { path: '/modifier-fleuriste', component: ModifierFleuristComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
