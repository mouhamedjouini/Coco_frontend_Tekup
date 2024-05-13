import { Component, OnInit } from '@angular/core';
import { CollocationService } from '../../services/collocation.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CovoiturageService } from '../../services/covoiturage.service';
import { ReservationService } from '../../services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listcovoiturage-ad',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './listcovoiturage-ad.component.html',
  styleUrl: './listcovoiturage-ad.component.css'
})
export class ListcovoiturageAdComponent   implements OnInit {
  // public url='http://localhost:9093/'
  constructor( private router: Router , private list : CovoiturageService,  private reservationService: ReservationService){}
  covoitu : any;

  ngOnInit(): void {
    this.list.getall().subscribe(
      (res)=>{
        this.covoitu=res;
        console.log(res)
      },(err)=>{
        console.log(err);
    
        this.ngOnInit()
      }
      
    )
    
  }
  async afficherPopupReservation(annonceId: number) {
    const { value: placesReservees } = await Swal.fire({
      title: 'Nombre de places',
      input: 'number',
      inputLabel: 'Combien de places souhaitez-vous réserver ?',
      inputAttributes: {
        min: '1',
        step: '1'
      },
      showCancelButton: true,
      confirmButtonText: 'Réserver',
      cancelButtonText: 'Annuler'
    });

    if (placesReservees) {
      this.reserverAnnonce(annonceId, placesReservees);
    }
  }

  reserverAnnonce(annonceId: number, placesReservees: number): void {
    console.log("annonce"+annonceId+"place"+placesReservees)
    this.reservationService.ajouterReservation(annonceId, placesReservees)
      .subscribe(
        response => {
          Swal.fire('Succès', response.message, 'success');
        },
        error => {
          console.log(error)
          Swal.fire('Erreur', 'Une erreur s\'est produite', 'error');
        }
      );
  }
}

