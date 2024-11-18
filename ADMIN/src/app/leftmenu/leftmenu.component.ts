import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent {
  constructor(private http: HttpClient) { }
  logOut(){
    return this.http.post<any>('api/auth/logout', { withCredentials: true })
  }

}
