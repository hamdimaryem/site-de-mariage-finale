import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutFleuristeComponent } from './ajout-fleuriste/ajout-fleuriste.component';

import { SignupComponent } from './interface_user/signup/signup.component';
import { MariageComponent } from './interface_user/mariage/mariage.component';
import { GereFleuristeComponent } from './gere-fleuriste/gere-fleuriste.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { NavbarComponent } from './interface_user/navbar/navbar.component';
import { ConsulterFleuristeComponent } from './consulterfleuriste/consulterfleuriste.component';
import { ModifierFleuristComponent } from './modifier-fleurist/modifier-fleurist.component';


const routes: Routes = [
  { path: '', component:AuthentificationComponent},
  { path: '/gere_fleuriste', component:GereFleuristeComponent},
  { path: '/authentification', component:AuthentificationComponent},
{ path: '/signup', component:SignupComponent},
{ path: '/ajout-fleuriste', component:AjoutFleuristeComponent },
{path:'/admin_home',component: HomeAdminComponent},
{path:'/mariage',component: MariageComponent},
{path:'/navbar',component:NavbarComponent},
{path:'/consulter',component:ConsulterFleuristeComponent},
{path:'/modifier-fleuriste',component:ModifierFleuristComponent}


 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
