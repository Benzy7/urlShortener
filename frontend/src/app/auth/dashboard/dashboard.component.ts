import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export class url {
  constructor(
    public id: String,
    public mainUrl: String,
    public shortUrl: String,
    public nbv: number,
  ) {
    
  }
}
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  insertForm: FormGroup;  
  urls: url[];

  constructor(
    private toastr: ToastrService,
    private routerS: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
  ) {
    this.urls = [];

    this.insertForm = this.fb.group({
      nvUrl: ['']
    })
  }

  ngOnInit() {
    this.insertForm = this.formBuilder.group({
      //url: []
    });

    this.httpClient.get<any>('http://localhost:3000/urls').subscribe((urls: url[]) => {
      this.urls = urls;
      });
  }

  onSubmit() {
    var formData: any = new FormData();
    formData.append("nvUrl", this.insertForm.get('nvUrl').value);
  
    this.httpClient.post('http://localhost:3000/urls', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }
}
