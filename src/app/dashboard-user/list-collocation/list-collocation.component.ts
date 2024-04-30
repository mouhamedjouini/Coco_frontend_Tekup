import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollocationService } from '../../services/collocation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-collocation',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './list-collocation.component.html',
  styleUrl: './list-collocation.component.css'
})
export class ListCollocationComponent  implements OnInit {
  constructor( private router: Router , private list : CollocationService){}
  collocation : any;
  ngOnInit(): void {
    this.list.getall().subscribe(
      (res)=>{
        this.collocation=res;
        console.log(res)
      },(err)=>{
        console.log(err)
      }
      
    )
    
  }
  
}
