import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GereFleuristeComponent } from './gere-fleuriste/gere-fleuriste.component';
import { AjoutFleuristeComponent } from './ajout-fleuriste/ajout-fleuriste.component';
import { ModifierFleuristComponent } from './modifier-fleurist/modifier-fleurist.component';

const routes: Routes = [
  { path: '', component: GereFleuristeComponent },
  { path: '/ajout-fleuriste', component: AjoutFleuristeComponent },
  { path: '/modifier-fleuriste', component: ModifierFleuristComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
