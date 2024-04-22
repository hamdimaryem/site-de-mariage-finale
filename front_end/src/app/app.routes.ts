import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { GereFleuristeComponent } from './gere-fleuriste/gere-fleuriste.component';
import { AjoutFleuristeComponent } from './ajout-fleuriste/ajout-fleuriste.component';
import { ModifierFleuristComponent } from './modifier-fleurist/modifier-fleurist.component';
import { SignupComponent } from './interface_user/signup/signup.component';
import { MariageComponent } from './interface_user/mariage/mariage.component';




export const appRoutes: Routes = [
  { path: '', component:GereFleuristeComponent },
  { path: 'gere-fleuriste', component:GereFleuristeComponent },
  { path: 'ajout-fleuriste', component:AjoutFleuristeComponent },
  { path: 'modif-fleuriste', component:ModifierFleuristComponent },

  { path: "mariage", component:MariageComponent },
  { path: "ajout-fleuriste", component: AjoutFleuristeComponent },
  {path:"modifier-fleurist",component: ModifierFleuristComponent}
];

