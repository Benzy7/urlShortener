import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(){
    this.authService.getProfile().subscribe( (Suser) => {
      console.log((Suser as any))
      this.user = (Suser as any).user
    }, 
    (err) => {
       console.log(err);
       return false
      }
    )
  }

}