import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged: boolean
  notLogged: boolean

  constructor(
    private router: Router,
    private toastService: ToastService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.logged = this.authService.loggedIn()
    this.notLogged = this.authService.loggedOut();
    console.log(this.logged)
  }

  onLogoutClick(){
    this.authService.logout();
    this.toastService.info("Vous avez déconnecté avec succès");
    this.router.navigate(['/']);
    return false;
  }
}
