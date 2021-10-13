import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-layout>
    <div class="container">
      <form>
        <div class="form-group">
          <label for="formGroupExampleInput">Saisir Url</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
        </div>
      </form>
    </div>  
    </app-layout>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
