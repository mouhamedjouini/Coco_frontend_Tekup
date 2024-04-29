import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CovoiturageService {
 
  constructor(private http : HttpClient , private router:Router) { }
  private  url = 'http://localhost:9093/annoncecovoiturage';
  public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  ajouter(annocecovoi : any){
    return this.http.post(this.url +'/addAnnonce',annocecovoi)
  }
getall(){
  return this.http.get(this.url +'/all')
}
supprimer(annonceId:any){
  return this.http.delete(this.url+'/delete/'+annonceId)

}
modifier(id :any , annocecovoi : any){
  return this.http.put(this.url+'update'+id ,annocecovoi,{headers:this.headers})
}
findByLieuDepart(lieuDepart: any) {
  return this.http.get(this.url + 'bylieu?lieuDepart=' + lieuDepart, { headers: this.headers });
}

rechercherAnnoncesParUtilisateur(userId: any) {
  return this.http.get(this.url + '/byUser?userId=' + userId);
}

trierAnnonceCovoiturageParDate() {
  return this.http.get(this.url + '/sortAnnoncebyDate');
}

getStatsByUsers() {
  return this.http.get(this.url + 'stats/users', { headers: this.headers });
}

getUserWithMostAnnouncements() {
  return this.http.get(this.url + 'userWithMostAnnouncements', { headers: this.headers });
}
}
