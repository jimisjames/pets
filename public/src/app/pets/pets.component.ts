import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  constructor(private _httpService: HttpService){}

  pets = []

  ngOnInit() {
    this.getPets()
  }

  getPets(){
    let observable = this._httpService.getPets()
    observable.subscribe(data => {
      if(data["message"] == "Success"){
        this.pets = data["data"]
      }
    })
  }

}
