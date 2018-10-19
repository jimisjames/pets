import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  pet = null
  button = false

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getPet(params['id'])
    });
  }

  getPet(id){
    let observable = this._httpService.getPet(id)
    observable.subscribe(data => {
      if(data["message"] == "Success"){
        this.pet = data["data"]
      }
    })
  }

  like(){
    this.pet.likes++
    let observable = this._httpService.like(this.pet)
    observable.subscribe(data => {
      if(data["message"] == "Success"){
        this._route.params.subscribe((params: Params) => {
          this.getPet(params['id'])
        });
        this.button = true
      }
    })
  }

  delete(){
    let observable = this._httpService.delete(this.pet._id)
    observable.subscribe(data => {
      if(data["message"] == "Success"){
        this._router.navigate(['/pets']);
      }
    })
  }
}
