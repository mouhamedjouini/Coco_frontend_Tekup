import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token!: string;
  private helper = new JwtHelperService();
  public loggedUser!:string;
public isloggedIn: Boolean = false;
public roles!:string[];
  constructor(private http: HttpClient) { }
  private  url = 'http://localhost:9093/';
  register(user:any){
    return this.http.post(this.url+'register',user,{ responseType: 'text' });
  }
  login(user:any){
    return this.http.post(this.url+'login',user , {observe:'response'});
  }
  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  
    }
    getCurrentUser(){
      return this.http.get(this.url+''+this.loggedUser)

    }
  
      getToken():string {
      return this.token;
      }
      getRoles():string[] {
        return this.roles;
        }
      decodeJWT(){
         if (this.token == undefined)
          return;
       const decodedToken = this.helper.decodeToken(this.token);
       this.roles = decodedToken.roles;
       this.loggedUser = decodedToken.sub;
      
    console.log(""+this.roles+this.loggedUser);
}
}
