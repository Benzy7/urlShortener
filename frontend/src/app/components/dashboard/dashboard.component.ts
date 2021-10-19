import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';

import { Url } from 'src/app/url';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  urls: Url[] = [];

  constructor(
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.urlService.getAllUrls().subscribe( (urls) => this.urls = urls);
  }

  addUrl(url: Url){
    this.urlService.addUrl(url).subscribe( (url) => this.urls.push((url as any)));
  }
}
