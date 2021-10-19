import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  username: string;
  email: string;
  password: string;

  constructor(
    private toastService: ToastService,
    private valdiateService: ValidateService,
    private authService: AuthService,
    private flashMessagesSv: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onInscriptionSubmit(){
    console.log("reg submit :", this.username, this.email)

    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    if (!this.valdiateService.validateInscription(user)) {
      this.flashMessagesSv.show("Remplissez tous les champs s'il vous plait", {cssClass: 'alert-danger', timeout: 3000})
      return false;
    }else{
      if (!this.valdiateService.validateEmail(user.email)) {
        this.flashMessagesSv.show("Mal format d'email", {cssClass: 'alert-danger', timeout: 3000})
        return false;
      }else{
        console.log("reg all good")
        this.authService.regUser(user).subscribe((data) => {
          console.log(data)
          if ((data as any).success) {
            this.toastService.success((data as any).message);
            //this.flashMessagesSv.show((data as any).message , {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/login'])
          } else {
            this.toastService.error((data as any).message);
            //this.flashMessagesSv.show((data as any) , {cssClass: 'alert-warning', timeout: 3000});
            this.router.navigate(['/inscription'])
          }
        });
        return true;
      }
    }
  }
}
