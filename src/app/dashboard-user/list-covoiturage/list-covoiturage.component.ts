import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-covoiturage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-covoiturage.component.html',
  styleUrl: './list-covoiturage.component.css'
})
export class ListCovoiturageComponent implements OnInit {
  constructor(){}
  covoiturage : any;

  ngOnInit(): void {
    
  }

}
