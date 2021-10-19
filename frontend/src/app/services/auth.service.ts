import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
  ) { }

  regUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/user/inscription', user, {headers: headers})
  }

  authenticateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/user/login', user, {headers: headers})
  }

  getProfile(){{
      const token = localStorage.getItem('id_token');
      return this.http.get('http://localhost:3000/api/user/profile', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      })
    }
  }

  storeUserData(token: any, user: any){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //get the token to use in profile
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  loggedOut() {
    return !this.loggedIn();
  }


  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
