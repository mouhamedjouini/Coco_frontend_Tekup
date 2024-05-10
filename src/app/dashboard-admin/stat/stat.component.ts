import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CovoiturageService } from '../../services/covoiturage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-stat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.css'
})
export class StatComponent implements OnInit {
  @ViewChild('myChart') myChart!: ElementRef;
  chart: any;
  constructor(private covoiturageService: CovoiturageService) { }

  ngOnInit(): void {
    this.getStatsByUsers();
  }

  getStatsByUsers(): void {
    this.covoiturageService.getStatsByUsers().subscribe(
      (data: any) => {
        console.log('Statistiques des utilisateurs : ', data);
        this.createChart(data);
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération des statistiques des utilisateurs : ', error);
      }
    );
  }

  createChart(statsData: { [key: string]: any }): void {
    const ctx = this.myChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(statsData).map(key => statsData[key].username),
        datasets: [{
          label: 'Nombre d\'annonces',
          data: Object.values(statsData).map((val: any) => val.announcementCount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
}
