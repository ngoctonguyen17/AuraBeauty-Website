import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Đảm bảo import đúng đường dẫn

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html', // Đảm bảo đường dẫn đúng
  styleUrls: ['./header.component.css'] // Đảm bảo đường dẫn đúng
})
export class HeaderComponent implements AfterViewInit {
  private hideTimeout: any;

  constructor(private renderer: Renderer2, private router: Router, private authService: AuthService) {}

  ngAfterViewInit(): void {
    const header = document.querySelector('.header');

    this.renderer.listen('window', 'scroll', () => this.showHeader(header));
    this.renderer.listen('window', 'mousemove', () => this.showHeader(header));
    this.renderer.listen('window', 'keydown', () => this.showHeader(header));

    // Ẩn header nếu không có hoạt động trong 3 giây khi trang được tải lần đầu
    this.hideTimeout = setTimeout(() => this.hideHeader(header), 3000);
  }

  private hideHeader(header: Element | null): void {
    if (header) {
      header.classList.add('hidden');
    }
  }

  private showHeader(header: Element | null): void {
    if (header) {
      console.log('Header shown!'); // Dòng log để kiểm tra
      header.classList.remove('hidden');

      clearTimeout(this.hideTimeout);

      this.hideTimeout = setTimeout(() => this.hideHeader(header), 3000);
    }
  }

  openUser(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/account']); // Điều hướng đến Account nếu đã đăng nhập
    } else {
      this.router.navigate(['/login']); // Điều hướng đến Login nếu chưa đăng nhập
    }
  }

}
