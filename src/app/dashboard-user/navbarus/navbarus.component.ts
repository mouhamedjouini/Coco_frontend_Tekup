import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbarus',
  standalone: true,
  imports: [RouterLinkActive , RouterLink],
  templateUrl: './navbarus.component.html',
  styleUrl: './navbarus.component.css'
})
export class NavbarusComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
   
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.clear(); 
    this.router.navigateByUrl('/login')
}
}
