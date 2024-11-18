import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Emitters } from '../../assets/emitter/emitter';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  authenticated = false;
  message = '';

  @Output() logoutEvent = new EventEmitter<void>(); // Emit logout event to parent component

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.subscribeToAuthEmitter();
  }

  private checkAuthentication(): void {
    this.http.get('http://localhost:8080/api/user', { withCredentials: true })
      .pipe(
        catchError(err => {
          this.message = ''; // Reset message on error
          Emitters.authEmitter.emit(false);
          return of(null); // Return a null observable on error
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.message = `Hi ${res.fullName}`;
          Emitters.authEmitter.emit(true);
        }
      });
  }

  private subscribeToAuthEmitter(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  logout(): void {
    this.http.post('http://localhost:8080/api/logout', {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        this.message = '';
        this.logoutEvent.emit(); // Emit logout event
      }, (err) => {
        console.error('Logout failed', err); // Log error if logout fails
      });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
