import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Product } from '../models/Product';
import { CartService } from '../cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private cartservice: CartService, private titleService: Title) {
    this.titleService.setTitle("Cart - Aura Beauty");
  }

  items = this.cartservice.getitems();

  getFormattedTotalPrice(item: any): string {
    const unitPrice = parseInt(item.UnitPrice.replace(/\D/g, ''), 10);
    const promotion = item.Promotion ? parseFloat(item.Promotion.replace('%', '').trim()) / 100 : 0;
    const CurrentPrice = unitPrice - unitPrice * promotion;
    const totalPrice = item.amount * CurrentPrice;

    return totalPrice.toLocaleString('fr') + ' VND';
  }

  tongtien() {
    let tt: number = 0;
    this.items.forEach(item => {
      const unitPrice = parseInt(item.UnitPrice.replace(/\D/g, ""), 10);
      const totalPrice = item.amount * unitPrice;
      tt += totalPrice;
    });
    const formattedTotal = tt.toLocaleString('fr', { useGrouping: true });
    return formattedTotal + ' VND';
  }

  tongsoluong() {
    let tsl: number = 0;
    this.items.forEach(item => tsl += item.amount);
    return tsl;
  }

  removeItem(item: any): void {
    this.cartservice.removeItem(item);
  }

  increaseQuantity(item: Cart): void {
    item.amount++;
  }

  decreaseQuantity(item: Cart): void {
    if (item.amount > 1) {
      item.amount--;
    }
  }

  clearCart(): void {
    this.cartservice.clearcart();
    location.reload();
  }
}
