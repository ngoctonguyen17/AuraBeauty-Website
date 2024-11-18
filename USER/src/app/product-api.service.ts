import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { PaymentInfo } from './models/Payment';
import { Product } from './models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductAPIService {


  constructor(private _http: HttpClient) { }


getProdcut():Observable<any>
{
const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
const requestOptions:Object={
headers:headers,
responseType:"text"
}
return this._http.get<any>("http://localhost:8080/ProductInfo",requestOptions).pipe(
map(res=>JSON.parse(res) as Array<Product>),
retry(3),
catchError(this.handleError))
}

getProduct(Name: string): Observable<Product[]> {
  const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf8");
  const requestOptions: Object = {
    headers: headers,
    responseType: "text"
  };

  return this._http.get<any>("http://localhost:8080/ProductInfo/" + Name, requestOptions).pipe(
    map(res => JSON.parse(res) as Array<Product>),
    retry(3),
    catchError(this.handleError)
  );
}
getProductA(Artist: string): Observable<Product[]> {
  const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf8");
  const requestOptions: Object = {
    headers: headers,
    responseType: "text"
  };

  return this._http.get<any>("http://localhost:8080/ProductInfo/Artist/" + Artist, requestOptions).pipe(
    map(res => JSON.parse(res) as Array<Product>),
    retry(3),
    catchError(this.handleError)
  );
}
getProductI(Product_id: string): Observable<Product> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
  const requestOptions: Object = {
    headers: headers,
    responseType: 'json'
  };
  return this._http.get<Product>('http://localhost:8080/ProductInfo/id/' + Product_id, requestOptions).pipe(
    retry(3),
    catchError(this.handleError)
  );
}
postProduct(aProduct: any): Observable<Product> {
  const headers = new HttpHeaders().set(
    'Content-Type',
    'application/json;charset=utf-8'
  );

  const requestOptions: Object = {
    headers: headers,
    responseType: 'json',
  };
  return this._http.post<Product>('http://localhost:8080/ProductInfo', aProduct, requestOptions).pipe(
    retry(3),
    catchError(this.handleError)
  );
}
handleError(error:HttpErrorResponse){
return throwError(()=>new Error(error.message))
}
}

