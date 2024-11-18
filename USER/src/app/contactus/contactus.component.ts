import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Contact - Aura Beauty"); // Đặt tiêu đề trang ở đây
  }
}
