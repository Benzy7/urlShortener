import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
  <div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/dashboard">URL Raccourcisseur</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
    <ul class="navbar-nav ">
      <li class="nav-item">
        <a class="nav-link"  routerLink='/auth/login'>Déconnexion</a>
      </li>
    </ul>
  </div>
  </nav>

  <div class=" wrapper d-flex justify-content-center align-items-center">
  <ng-content></ng-content>
  </div>

  </div>
  
  `,
  styles: [
  `

  `
  ]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
