import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Đảm bảo import đúng đường dẫn

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  userName: string = 'NGUYEN KIM KIM';
  activeTab: string = 'info';
  showPassword: boolean = false;
  userInfo = {
    fullName: 'Nguyễn Kim Kim',
    email: 'kiki25@gmail.com',
    password: '123456'
  };
  // newAddress: string = '';
  // newPhone: string = '';
  // addresses: { address: string; address: string }[] = [];

  // address: string = '';
  // phone: string = '';

  addresses = {
      address: 'Hà Nội',
      phone: '123456'
    };
  // addresses = [
  //   {
  //     address: 'Hà Nội',
  //     phone: '123456'}
  // ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  logout(): void {
    this.authService.logout(); // Gọi phương thức logout từ AuthService
    this.router.navigate(['/']); // Điều hướng về trang đăng nhập
  }


  // addAddress() {
  //   // Thêm user mới
  //   this.addresses.push({
  //     address: this.address,
  //     phone: this.phone,
  //   });
  // }

}