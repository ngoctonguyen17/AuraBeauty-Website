import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  @Output() loginSuccess = new EventEmitter<void>(); // Output để phát sự kiện

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  adloginForm!: FormGroup;

  mockUsers = [
    { email: 'tontn21406c@st.uel.edu.vn', password: '123' },
    { email: 'kieuanh@gmail.com', password: '123' },
    { email: 'huyenntt@gmail.com', password: '123' },
    { email: 'kimlnh@gmail.com', password: '123' },
    { email: 'huongptt@gmail.com', password: '123' }
  ];

  ngOnInit(): void {
    this.adloginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  validateEmail(email: any): boolean {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex) ? true : false;
  }

  adlogin(): void {
    const user = this.adloginForm.getRawValue();
    console.log(user);

    if (user.email === "" || user.password === "") {
      Swal.fire("Error", "Please enter all fields", "error");
    } else if (!this.validateEmail(user.email)) {
      Swal.fire("Error", "Please enter a valid email", "error");
    } else {

      const foundUser = this.mockUsers.find(
        mockUser => mockUser.email === user.email && mockUser.password === user.password
      );

      if (foundUser) {
        Swal.fire('Success', 'Login successful', 'success');
        this.loginSuccess.emit();
        this.router.navigate(['/admin']);
      } else {
        Swal.fire('Fail', 'Invalid email or password', 'error');
      }
    }
  }
}
