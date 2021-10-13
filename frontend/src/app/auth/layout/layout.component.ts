import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <div>
      <app-header></app-header>
      <div class=" wrapper d-flex justify-content-center align-items-center">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
  `
  .wrapper{
    height:90vh;
  }
  .form{
    width:350px;
     box-shadow:7px 5px 20px #968b8b3d;
  }
  .info-text{
    font-size:12px;
  }
  `
  ]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
