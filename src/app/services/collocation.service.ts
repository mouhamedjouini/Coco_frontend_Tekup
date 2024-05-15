import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollocationService {
  constructor(private http : HttpClient,private router:Router) { }
  private  url = 'http://localhost:9093/annonces';
  public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  ajouter(annocecoll : any){
    console.log(annocecoll)
    return this.http.post(this.url +'/add',annocecoll)
  }
  getall(){
    return this.http.get(this.url +'/all')
  }
  supprimer(id:any){
    return this.http.delete(this.url+'/delete/'+id)
  }
  modifier(id :any , annocecoll : any){
    return this.http.put(this.url+'update'+id ,annocecoll)
  }
  getbyid(id:any){
    return this.http.get(this.url+id)
  }
  getAnnoncesByUser(userId: number): Observable<any> {
    const url = `${this.url}/CollocationbyUser/${userId}`; // URL complète avec path parameter
    return this.http.get<any>(url);
  }

}
