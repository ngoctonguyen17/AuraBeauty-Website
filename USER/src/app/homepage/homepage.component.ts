import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  banners = [
    { image: '../../assets/images/Banner/1.gif', alt: 'Banner 1' },
    { image: '../../assets/images/Banner/2.gif', alt: 'Banner 2' },
    { image: '../../assets/images/Banner/3.gif', alt: 'Banner 3' },
    { image: '../../assets/images/Banner/4.gif', alt: 'Banner 4' }
  ];

  currentBannerIndex = 0;
  bannerInterval: any;

  constructor(private titleService: Title) {
    this.titleService.setTitle("Aura Beauty"); // Đặt tiêu đề trang ở đây
  }
  ngOnInit() {
    this.startBannerRotation();
  }

  ngOnDestroy() {
    this.stopBannerRotation();
  }

  startBannerRotation() {
    this.bannerInterval = setInterval(() => {
      this.nextBanner();
    }, 5000);
  }

  stopBannerRotation() {
    if (this.bannerInterval) {
      clearInterval(this.bannerInterval);
    }
  }

  nextBanner() {
    this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    this.restartBannerRotation();
  }

  prevBanner() {
    this.currentBannerIndex = (this.currentBannerIndex - 1 + this.banners.length) % this.banners.length;
    this.restartBannerRotation();
  }

  restartBannerRotation() {
    this.stopBannerRotation();
    this.startBannerRotation();
  }

  reviews = [
    { name: 'Meo Meo', text: 'Great customer service and fast shipping! Will definitely order again.', image: '../../assets/images/customer-parnership/Pamela.jpg' },
    { name: 'Hoang Trung', text: 'Great customer service and fast shipping! Will definitely order again.', image: '../../assets/images/customer-parnership/Pamela.jpg' },
    { name: 'Ngoc To', text: 'Tuyetvoi ong mat troi nhe, day la riu comment, khong bao gio noi doi dau nhe', image: '../../assets/images/customer-parnership/Pamela.jpg' },
    { name: 'Huynh Nga', text: 'Tuyetvoi ong mat troi nhe, day la riu comment, khong bao gio noi doi dau nhe', image: '../../assets/images/customer-parnership/Pamela.jpg' },
    { name: 'Ngoc To', text: 'Tuyetvoi ong mat troi nhe, day la riu comment, khong bao gio noi doi dau nhe', image: '../../assets/images/customer-parnership/Pamela.jpg' },
    { name: 'Huynh Nga', text: 'Tuyetvoi ong mat troi nhe, day la riu comment, khong bao gio noi doi dau nhe', image: '../../assets/images/customer-parnership/Pamela.jpg' },
    { name: 'Ngoc To', text: 'Tuyetvoi ong mat troi nhe, day la riu comment, khong bao gio noi doi dau nhe', image: '../../assets/images/customer-parnership/Pamela.jpg' },
    { name: 'Huynh Nga', text: 'Tuyetvoi ong mat troi nhe, day la riu comment, khong bao gio noi doi dau nhe', image: '../../assets/images/customer-parnership/Pamela.jpg' },
  ];

  visibleReviewsCount = 4;
  showAll = false;

  toggleVisibility() {
    this.showAll = !this.showAll;
    this.visibleReviewsCount = this.showAll ? this.reviews.length : 4;
  }

  partners = [
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
    { image: '../../assets/images/customer-parnership/Cocoon.jpg' },
  ];

  visibleBrandCount = 14;
  showAllBrand = false;

  toggleVisibilityBrand() {
    this.showAllBrand = !this.showAllBrand; // Fixed the toggle logic
    this.visibleBrandCount = this.showAllBrand ? this.partners.length : 7; // Adjusted to the correct array
  }
}
