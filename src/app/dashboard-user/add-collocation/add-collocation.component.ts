import { Component, OnInit } from '@angular/core';
import { CollocationService } from '../../services/collocation.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { user } from '../../models/User';

export enum TypeLogement {
  appartement = 'appartement',
  maison = 'maison'
}
export enum TypeAnnoColloc {
  room_sharing = 'room_sharing',
  full_recent = 'full_recent'
}

@Component({
  selector: 'app-add-collocation',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-collocation.component.html',
  styleUrl: './add-collocation.component.css'
})
export class AddCollocationComponent implements OnInit {
  collocation={
    "date_dispo": "",
    "nbre_chmbre": 0,
    "descrption": "",
    "nbre_person": 0,
    "typeLogement": "",
    "typeAnnoColloc": "",
    "userId": 0,
    "montant": 0
  }
  user:any 
  typeLogementOptions:TypeLogement[]=[
    TypeLogement.appartement,
    TypeLogement.maison

  ];
  typeAnnoCollocOptions:TypeAnnoColloc[]=[
    TypeAnnoColloc.full_recent,
    TypeAnnoColloc.room_sharing
  ];
  constructor(private collocationservice  : CollocationService , private router : Router,private authService :AuthService){}
  getCurrentUser(){
  this.authService.getCurrentUser().subscribe({
    next:(data)=>{
      console.log(data);
      this.user=data
      console.log(this.user);
    },
    error(err) {
      console.log(err)
      
    },
  })}
  ngOnInit(): void {
    this.getCurrentUser();
  }
  ajouter(){
    this.collocation.userId=this.user.id;

    this.collocationservice.ajouter(this.collocation).subscribe(
      (res)=>{
        console.log(this.collocation.descrption);
        console.log(this.collocation.date_dispo);
        console.log(res);
        this.router.navigate(['dashboardUser/listcollocation'])
        },
        err=>{
          console.log(err);
  
        }
      )
      ;
      }
      logout(){
        this.router.navigate(['/login'])
      }


}
