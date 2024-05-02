import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterLink],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

}
