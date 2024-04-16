import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AppRoutingModule } from './app-routing.module'; 
import { RouterModule } from '@angular/router'; 

@NgModule({ 
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, // Ajout de AppRoutingModule aux imports
    RouterModule ,
   // Importation de RouterModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
