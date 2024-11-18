
import { Component, OnInit } from '@angular/core';

import { Emitters } from '../../assets/emitter/emitter';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticated = false;
constructor(private http: HttpClient) {}
ngOnInit(): void {
  this.http
  .get('http://localhost:8080/api/user', { withCredentials:true })
  .subscribe(
    (res: any) => {
      this.message = `Hi ${res.fullName}`;
      Emitters.authEmitter.emit(true)
    },
    (err) => {
      this.message = ""
      Emitters.authEmitter.emit(false)
    }
  )
    Emitters.authEmitter.subscribe((auth:boolean) => {
      this.authenticated =  auth
    })}
    logout(): void{
      this.http.post('http://localhost:8080/api/logout',{},{withCredentials:true})
      .subscribe(() =>
        this.authenticated = false
      )
    }
    message = '';

}

