import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Url } from 'src/app/url';
import { Subscription } from 'rxjs';
import { UrlService } from 'src/app/services/url.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css']
})
export class AddUrlComponent implements OnInit {
  @Output() onAddUrl: EventEmitter<Url> = new EventEmitter();

  mainUrl: string;
  shortUrl: string = "";
  nbv: number = 0;
  urlCode = "";

  sub: Subscription;

  constructor(
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.mainUrl){
      this.toastService.error("Veuillez ajouter une URL");
      return;
    }
    console.log(this.mainUrl);

    const newUrl = {
      mainUrl: this.mainUrl,
      shortUrl: this.shortUrl,
      nbv: this.nbv,
      urlCode: this.urlCode
    }

    this.onAddUrl.emit(newUrl)
    
    this.mainUrl = ""
  }

}
