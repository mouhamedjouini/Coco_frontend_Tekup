import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  user ={
    username:'',
    password:''
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  token :any
   role : any;
}
