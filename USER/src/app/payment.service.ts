import { Component, ElementRef, OnInit, Injectable} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Product } from './models/Product';
import { PaymentInfo, discountInfo } from './models/Payment';
import { Cart } from './models/cart';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  get<T>(arg0: string, requestOptions: Object) {
    throw new Error('Method not implemented.');
  }

  paymentinfo: PaymentInfo[] = [];

  constructor(private _http: HttpClient) { }
//payment
  getPayment():Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:8080/PaymentInfo",requestOptions).pipe(
  map(res=>JSON.parse(res) as Array<PaymentInfo>),
  retry(3),
  catchError(this.handleError));
  };

postPayment(aPaymentInfo: any): Observable<PaymentInfo> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'json',
      observe: 'response', // Thêm observe: 'response' vào tùy chọn yêu cầu
    };
    return this._http.post<PaymentInfo>('http://localhost:8080/PaymentInfo', aPaymentInfo, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  //discount
getDiscount():Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:8080/discountInfo",requestOptions).pipe(
  map(res=>JSON.parse(res) as Array<discountInfo>),
  retry(3),
  catchError(this.handleError));
  };

getDiscountA(discount_code:any):Observable<discountInfo[]>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:8080/discountInfo/" + discount_code ,requestOptions).pipe(
  map(res=>JSON.parse(res) as Array<discountInfo>),
  retry(3),
  catchError(this.handleError));
  };

deleteDiscount(_id: string): Observable<any> {
    return this._http.delete<discountInfo[]>('http://localhost:8080/discountInfo/' + _id).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

putDiscount(discount: any): Observable<discountInfo> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );

    const requestOptions: Object = {
      headers: headers,
      responseType: 'json',
    };
    return this._http.put<discountInfo>('http://localhost:8080/discountInfo', discount, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
    }

    private apiUrl = 'http://localhost:8080/PaymentInfo'; // Đường dẫn API của server

    savePaymentInfo(id: number,   paymentinfo: any) {
      const url = `${this.apiUrl}`;
      const body = { id,   paymentinfo };

      return this._http.post(url, body);
    }
}


