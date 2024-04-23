import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';;
import { CovoiturageService } from '../../services/covoiturage.service';
import { Router } from '@angular/router';
enum TypeCovoiturage {
  quotidien = 'quotidien',
  OCCASIONNELLE = 'OCCASIONNELLE'
}
@Component({
  selector: 'app-add-covoiturage',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './add-covoiturage.component.html',
  styleUrl: './add-covoiturage.component.css'
})
export class AddCovoiturageComponent implements OnInit {
  covoiturage={
  user :"" ,
  designation :"",
  heure_Depart :"",
  lieu_depart : "",
  nbrePlaceDisponible:"",
  typeCovoiturage: TypeCovoiturage.quotidien

  }

  typeCovoiturageOptions: TypeCovoiturage[] = [
    TypeCovoiturage.quotidien,
    TypeCovoiturage.OCCASIONNELLE
  ];     
  constructor(private covoiturageService  : CovoiturageService , private router : Router){}

  ngOnInit(): void {
    
  }
    ajouter(){
      this.covoiturageService.ajouter(this.covoiturage).subscribe(
        response => {
          console.log("Carpooling entry added successfully!");
          this.router.navigate(['/dashboardUser']);
        },
        error => {
          console.error("Failed to add carpooling entry:", error);
        }
      );
  }
  logout(){
    this.router.navigate(['/login'])
  }
    }

