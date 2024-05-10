import { Component } from '@angular/core';
import {  ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { PopContentComponent } from '../pop-content/pop-content.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CovoiturageService } from '../../services/covoiturage.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mapleaflet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mapleaflet.component.html',
  styleUrl: './mapleaflet.component.css'
})

export class MapleafletComponent implements OnInit {
  private map: any;
  private routes: any = []; 
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer: ViewContainerRef | any;
  
  private startLatLng: L.LatLng | null = null;
  private endLatLng: L.LatLng | null = null;
  private currentRoute: L.Routing.Control | null = null;
  constructor(private adminService : AuthService , private router:Router,private route:ActivatedRoute,private resolver: ComponentFactoryResolver , private  carppolingServiceService : CovoiturageService) {}
  @Output() er = new EventEmitter<any>();
  ngOnInit(): void {
   
    this.carppolingServiceService.getall().subscribe((data)=>{
    const routesList:any = [];
    console.log("ijeieie "+data)

    data.forEach((element:any) => {
      routesList.push({
        startCoords: [element.departLatitude, element.departLongitude], endCoords: [element.destinationLatitude,element.destinationLongitude], color: getRandomDarkColor() ,data : {
          "designation":element.designation,
          "heure_Depart":element.heure_Depart,
          "lieu_fin":element.lieu_fin,
          "lieu_depart":element.lieu_depart,
          "nbrePlaceDisponible":element.nbrePlaceDisponible,
       //   "typeCovoiturage":element.typeCovoiturage,
          
        }
      })
      console.log("list "+data);
      
   });
      routesList.forEach((route:any) => {
        this.createRoute(route.startCoords, route.endCoords , route.color , route.data);
      });
      
    })
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [36.63316209558658, 9.830017089843752],
      zoom: 14
    });
    //      center: [48.20807, 16.37320],


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    }).addTo(this.map);
  
this.map.on('click', (event: L.LeafletMouseEvent) => {
  
  if (!this.startLatLng) {
    this.startLatLng = event.latlng;
    this.endLatLng = null; 
  } else {
    this.endLatLng = event.latlng;

    this.clearRoutes();

    const newRoute = L.Routing.control({
      waypoints: [
        L.latLng(this.startLatLng.lat, this.startLatLng.lng), 
        L.latLng(this.endLatLng.lat, this.endLatLng.lng) 
      ],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
      }),
    }).addTo(this.map);

    this.routes.push(newRoute);

    newRoute.on('routesfound', (e: any) => {
      const routes = e.routes;
      const summary = routes[0].summary;
      console.log(summary);
      console.log('Total distance is ' + (summary.totalDistance / 1000).toFixed(2) + ' km and total time is ' + Math.round((summary.totalTime /60) / 60) + ' hour');
    });


    const popup = L.popup({
      minWidth: 250,
      closeButton: false
    }).setLatLng(event.latlng);

    const componentFactory = this.resolver.resolveComponentFactory(PopContentComponent);
    this.popupContainer.clear();
    const componentRef = this.popupContainer.createComponent(componentFactory);

    componentRef.instance.okClicked.subscribe((e: any) => {
      console.log(e);
      popup.remove();
    });

    popup.setContent(componentRef.location.nativeElement);
    popup.openOn(this.map);
  }

  console.log('Clicked coordinates:', event.latlng);
console.log(this.startLatLng);
console.log(this.endLatLng);
this.er.emit(this.startLatLng);
this.adminService.setData({
 position1 : this.startLatLng ,
 position2 : this.endLatLng
})
});

  }
  private createRoute(startCoords: any, endCoords: any, color: string  , data :any ): void {
    const routingControl =   L.Routing.control({
      waypoints: [
        L.latLng(startCoords[0], startCoords[1]),
        L.latLng(endCoords[0], endCoords[1])
      ],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
      }),
      lineOptions: {
        styles: [
          {
            color: color, 
            opacity: 0.7, 
            weight: 5 ,
            interactive: false 
          }
        ],
        extendToWaypoints: false, 
        missingRouteTolerance: 100
      },
    })
   

    let waypoints =[
      L.latLng(startCoords[0], startCoords[1]),
      L.latLng(endCoords[0], endCoords[1])
    ]

   let routeLayer = routingControl.addTo(this.map);

   this.map.eachLayer((layer:any) => {
    if (layer instanceof L.Marker && waypoints.some((wp:any) => wp.equals(layer.getLatLng()))) {
      const waypointMarker = layer as L.Marker;
      
      waypointMarker.dragging?.disable();
      
      waypointMarker.off('click');

       waypointMarker.on('mouseover', () => {
        const popupContent = `<div>
      
        <p><strong>Designation:</strong> ${data.designation}</p>
        <p><strong>Date Depart:</strong> ${data.heure_Depart}</p>
        <p><strong>Depart point :</strong> ${data.lieu_depart}</p>
        <p><strong>Final point :</strong> ${data.lieu_fin}</p>
        <p><strong>Nombre de place disponible :</strong> ${data.nbrePlaceDisponible}</p>
        <p>This is covoiturage</p>
        <button id="confirmButton">Confirm Participation</button>
      </div>`;
        waypointMarker.bindPopup(popupContent).openPopup();
       const confirmButton = document.getElementById('confirmButton');
       if (confirmButton) {
       confirmButton.addEventListener('click', () => {
       console.log('Participant confirmed');
       Swal.fire('Success!', 'Reservation  avec succès', 'success');
        this.router.navigate(['/dashboardUser'])
           // this.router.navigate(['/detailCarp', data.id]); // Passing the id directly to the route
       //console.log("id   ",data.id);
       

       waypointMarker.closePopup();

    });
  }
      });
    }
  });
 
   routingControl.getPlan().clearAllEventListeners(); 
const leafletRightElements = document.querySelectorAll('.leaflet-right');
leafletRightElements.forEach(element => {
  const leafletRightElement = element as HTMLElement;
  leafletRightElement.style.display = 'none';
});
  }
  
  
  
  private clearRoutes(): void {
    this.routes.forEach((route:any) => {
      this.map.removeControl(route);
    });
    this.routes = [];
  }
}

function getRandomDarkColor(): string {
  const r = Math.floor(Math.random() * 128);
  const g = Math.floor(Math.random() * 128);
  const b = Math.floor(Math.random() * 128);

  const color = `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
  return color;
}

function componentToHex(c: number): string {
  const hex = c.toString(16).toUpperCase();
  return hex.length === 1 ? `0${hex}` : hex;
}