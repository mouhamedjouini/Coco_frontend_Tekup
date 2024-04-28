import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CovoiturageService } from '../../services/covoiturage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-covoiturage',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './list-covoiturage.component.html',
  styleUrl: './list-covoiturage.component.css'
})
export class ListCovoiturageComponent implements OnInit {
  public url='http://localhost:9093/'
  constructor( private router: Router , private list : CovoiturageService){}
  covoitu : any;

  ngOnInit(): void {
    this.list.getall().subscribe(
      
    )
    
  }

}
