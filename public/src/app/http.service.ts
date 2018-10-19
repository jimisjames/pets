import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){}

  getPets(){
    return this._http.get("/all")
  }

  add(data){
    return this._http.post("/", data)
  }

  getPet(id){
    return this._http.get('/one/' + id)
  }

  like(data){
    return this._http.patch('/', data)
  }

  delete(id){
    return this._http.delete("/" + id)
  }

  update(data){
    return this._http.put("/", data)
  }
}
