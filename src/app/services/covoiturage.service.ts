import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageService {

  constructor(private http : HttpClient , private router:Router) { }
  public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  private  url = 'http://localhost:9093/annoncecovoiturage/';

  ajouter(annocecovoi : any){
    return this.http.post(this.url +'addAnnonce',annocecovoi)
  }
getall(){
  return this.http.get(this.url +'all',{headers:this.headers})
}
supprimer(id:any){
  return this.http.delete(this.url+id,{headers :this.headers})

}
modifier(id :any , annocecovoi : any){
  return this.http.put(this.url+'update'+id ,annocecovoi,{headers:this.headers})
}
findByLieuDepart(lieuDepart: any) {
  return this.http.get(this.url + 'bylieu?lieuDepart=' + lieuDepart, { headers: this.headers });
}

rechercherAnnoncesParUtilisateur(userId: any) {
  return this.http.get(this.url + 'byUser?userId=' + userId, { headers: this.headers });
}

trierAnnonceCovoiturageParDate() {
  return this.http.get(this.url + 'sortAnnoncebyDate', { headers: this.headers });
}

getStatsByUsers() {
  return this.http.get(this.url + 'stats/users', { headers: this.headers });
}

getUserWithMostAnnouncements() {
  return this.http.get(this.url + 'userWithMostAnnouncements', { headers: this.headers });
}
}
