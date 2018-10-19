import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ){}

  ngOnInit() {
  }

  newPet = {
    name: "",
    type: "",
    description: "",
    skill_one: "",
    skill_two: "",
    skill_three: "",
  }
  flash = []

  add(){
    this.flash = []
    let observable = this._httpService.add(this.newPet)
    observable.subscribe(data => {
      if(data["message"] == "Success"){
        this._router.navigate(['/pets']);
      } else if(data["message"] == "Error") {
        for(let err in data["error"]["errors"]){
          this.flash.push(data["error"]["errors"][err]["message"])
        }
      } else {
        this.flash.push(data["message"])
      }
    })
  }
}
