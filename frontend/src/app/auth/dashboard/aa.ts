import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-layout>
    <div class="container">
    <h3> Ajouter</h3>
      <form>
        <div class="form-group">
          <label for="UrlInput">Saisir URL</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Saisir Url">
        </div>
      </form>

      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">URL</th>
            <th scope="col">Nombre de visites</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">-</th>
            <td>www.google.com</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>  
    </app-layout>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private routerS: Router
  ) {}

  ngOnInit(): void {}

  handleSubmit() {
    
  }
}