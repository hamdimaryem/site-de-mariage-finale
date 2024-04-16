import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { GereFleuristeComponent } from './gere-fleuriste/gere-fleuriste.component';
import { AjoutFleuristeComponent } from './ajout-fleuriste/ajout-fleuriste.component';
import { ModifierFleuristComponent } from './modifier-fleurist/modifier-fleurist.component';



export const appRoutes: Routes = [
  { path: '', component: GereFleuristeComponent },
  { path: "ajout-fleuriste", component: AjoutFleuristeComponent },
  {path:"modifier-fleurist",component: ModifierFleuristComponent}
];

