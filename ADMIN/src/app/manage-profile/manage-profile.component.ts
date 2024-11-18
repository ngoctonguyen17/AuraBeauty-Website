import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent {
  selectedIndex = 0;

  onTabChange(index: number) {
    this.selectedIndex = index;
  }

}
