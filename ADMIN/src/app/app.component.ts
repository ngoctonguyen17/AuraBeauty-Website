import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ADMIN';
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  handleLoginSuccess() {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  handleLogout() {
    this.isLoggedIn = false; // Set logged in state to false
    localStorage.removeItem('isLoggedIn'); // Optional: Clear login state from local storage
  }
}
