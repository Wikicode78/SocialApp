import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  baseUrl1 = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    return this.http.get(this.baseUrl + 'bug/not-found').subscribe(response =>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }
  
  get400Error(){
    return this.http.get(this.baseUrl + 'bug/bad-request').subscribe(response =>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }
  get500Error(){
    return this.http.get(this.baseUrl + 'bug/server-error').subscribe(response =>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

  get401Error(){
    return this.http.get(this.baseUrl1 + 'bug/auth').subscribe(response =>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }
  get400ValidationError(){
    return this.http.post(this.baseUrl + 'account/register', {}).subscribe(response =>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

}
