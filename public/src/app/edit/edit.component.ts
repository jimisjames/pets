import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  pet = null
  flash = []

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getPet(params['id'])
    });
  }

  getPet(id){
    let observable = this._httpService.getPet(id)
    observable.subscribe(data => {
      console.log(data)
      if(data["message"] == "Success"){
        this.pet = data["data"]
      }
      console.log(this.pet)
    })
  }

  update(){
    this.flash = []
    let ok = true
    if(this.pet.name.length == 0){
      this.flash.push("Name is required dude")
      ok = false
    } else if(this.pet.name.length < 3){
      this.flash.push("Name has a required length of 3 dude")
      ok = false
    } 
    if(this.pet.type.length == 0){
      this.flash.push("Type is required dude")
      ok = false
    } else if(this.pet.type.length < 3){
      this.flash.push("Type has a required length of 3 dude")
      ok = false
    }
    if(this.pet.description.length == 0){
      this.flash.push("Description is required dude")
      ok = false
    } else if(this.pet.description.length < 3){
      this.flash.push("Description has a required length of 3 dude")
      ok = false
    }
    if(ok){
      let observable = this._httpService.update(this.pet)
      observable.subscribe(data => {
        //console.log(data)
        if(data["message"] == "Success"){
          this._router.navigate(['/pets/'+ this.pet._id]);
        } else {
          this.flash.push(data["message"])
        }
      })
    }
  }
}
