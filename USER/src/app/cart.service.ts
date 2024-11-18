import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from './models/Product';
import { Cart } from './models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartChanged = new Subject<void>();
  private storageKey = 'cartItems';
  items: Cart[] = [];

  constructor(private h: HttpClient) {
    // Khôi phục dữ liệu từ Local Storage khi khởi tạo CartService
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  addtoCart(sp: Product) {
    const index = this.items.findIndex(item => item._id === sp._id);
    if (index >= 0) {
      this.items[index].amount++;
    } else {
      const c: Cart = {
        _id: sp._id,
        Name: sp.Name,
        UnitPrice: sp.UnitPrice,
        category: sp.category,
        Image: sp.Image,
        amount: 1,
        Promotion: sp.Promotion
      };
      this.items.push(c);
    }

    this.saveItemsToLocalStorage(); // Lưu trữ dữ liệu vào Local Storage sau khi cập nhật giỏ hàng
  }

  private apiUrl = 'http://localhost:8080/PaymentInfo'; // Đường dẫn API của server

  saveCartInfo(id: number, items: any) {
    const url = `${this.apiUrl}`;
    const body = { id, items };

    return this.h.post(url, body);
  }

  getitems() {
    return this.items;
  }

  removeItem(item: Cart): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveItemsToLocalStorage(); // Lưu trữ dữ liệu vào Local Storage sau khi xóa một mục
      this.cartChanged.next();
    }
  }

  clearcart() {
    this.items = [];
    this.saveItemsToLocalStorage(); // Lưu trữ dữ liệu vào Local Storage sau khi xóa tất cả các mục
    return this.items;
    this.cartChanged.next();

  }

  getCartChanged(): Subject<void> {
    return this.cartChanged;
  }



 savecart(_id:number, item:Cart) {
  return this.h.post<any>(
    "http://localhost:8080/PaymentInfo",{
      "id": _id,
      "Name": item.Name,
      "category": item.category,
      "Image": item.Image,
    }
  )
 }


  private saveItemsToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
}
