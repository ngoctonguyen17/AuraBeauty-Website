<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
>>>>>>> 71a25a2b1a7ef31880c7128ba1b362c9c323a2e4

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
<<<<<<< HEAD
export class LoginComponent implements OnInit {
  //set title of page
  public constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private titleService: Title){
    this.titleService.setTitle("Login - Aura Beauty");
  }

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    })}


  validateEmail = (email: any) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[a-zA-Z0-9-]+(?:\.[a-z-Z0-9-]+)*$/;
    if(email.match(validRegex)){
      return true;
    }else {
      return false;
    }
  }



  login(): void {
    let user = this.loginForm.getRawValue();

    if (user.email == "" || user.password == "") {
      Swal.fire("Error", "Please enter all fields", "error");
    } else if (this.validateEmail(user.email)) {
      Swal.fire("Error", "Please enter a valid email", "error");
    } else {
      this.http.post("http://localhost:8080/api/login", user, { withCredentials: true })
        .subscribe(
          (res) => {
            this.router.navigate(['/']).then(() => {
              location.reload();
            });
          },
          (err) => {
            Swal.fire("Error", err.error.message, "error");
          }
        );
    }
  }
  }


=======
export class LoginComponent {
  isLoginForm = true;
  email: string = '';
  name: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  users = [
    {
      email: 'kiki25@gmail.com',
      password: '123456',
      name: 'Kiki'
    },
    {
      email: 'test@gmail.com', 
      password: '123456',
      name: 'Test User'
    }
  ];

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
    this.email = '';
    this.name = '';
    this.password = '';
    this.confirmPassword = '';
  }

  onSubmit() {
    if (this.isLoginForm) {
      // Xử lý đăng nhập
      const user = this.users.find(u => 
        u.email === this.email && u.password === this.password
      );
      
      if(user) {
        this.router.navigate(['/']);
        // console.log('Đăng nhập thành công!');
        // alert('Đăng nhập thành công!');
        // Có thể thêm logic chuyển hướng hoặc lưu session ở đây
        this.authService.login(); // Đánh dấu là đã đăng nhập
        this.router.navigate(['/']); // Điều hướng về Header
      } else {
        console.log('Email hoặc mật khẩu không chính xác!');
        alert('Email hoặc mật khẩu không chính xác!');
      }

    } else {
      // Xử lý đăng ký
      if(this.password !== this.confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
      }
      
      // Kiểm tra email đã tồn tại
      const existingUser = this.users.find(u => u.email === this.email);
      if(existingUser) {
        alert('Email đã được sử dụng!');
        return;
      }

      // Thêm user mới
      this.users.push({
        email: this.email,
        password: this.password,
        name: this.name
      });

      console.log('Đăng ký thành công!');
      alert('Đăng ký thành công!');
      this.isLoginForm = true; // Chuyển về form đăng nhập
    }
  }
}
>>>>>>> 71a25a2b1a7ef31880c7128ba1b362c9c323a2e4
