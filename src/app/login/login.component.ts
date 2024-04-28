import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private authService: AuthService,private router:Router){}
  public token!: string;
  private helper = new JwtHelperService();
  public loggedUser!:string;
public isloggedIn: Boolean = false;
public roles!:string;
  err:number = 0;
  user ={
    username:'',
    password:''
  }
  ngOnInit(): void {
  }
  decodeJWT(){
    if (this.token == undefined)
     return;
  const decodedToken = this.helper.decodeToken(this.token);
  this.roles = decodedToken.roles;
  this.loggedUser = decodedToken.sub;
console.log(""+this.roles+this.loggedUser);
}

   onLoggedin(){
this.authService.login(this.user).subscribe({
next: (data) => {
let jwToken = data.headers.get('Authorization')!;
this.authService.saveToken(jwToken);
if(this.roles=='Admin'){
  this.router.navigate(['/dashboardAdmin']);
}else{
this.router.navigate(['/dashboardUser']);
}
},
error: (err: any) => {
this.err = 1;
}
});
}
}
