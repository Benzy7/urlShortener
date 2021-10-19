import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    console.log("login good!");
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe((data) => {
      console.log("data ok");
      if ((data as any).succsess) {
        console.log("logged in");
        this.authService.storeUserData((data as any).token, (data as any).user);
        this.toastService.success((data as any).message);
        this.router.navigate(['/dashboard'])
      } else {
        console.log("not logged in");
        this.toastService.error((data as any).message);
        this.router.navigate(['/login']);
      }
    })
  }
}
