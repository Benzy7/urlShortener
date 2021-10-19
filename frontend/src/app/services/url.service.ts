import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Url } from 'src/app/url';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = 'http://localhost:3000/url';
  private shorten = 'http://localhost:3000/url/shorten';

  constructor(
    private http: HttpClient
  ) { }

  
  getAllUrls(): Observable<Url[]>{
    return this.http.get<Url[]>(this.apiUrl);
  }

  addUrl(url: Url){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    //console.log(url)
    return this.http.post('http://localhost:3000/url/shorten', url, {headers: headers})
  }
}
