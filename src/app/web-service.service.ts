import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from "rxjs";
import { Product } from './produto';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  baseURL = "https://banco-dados-teste.glitch.me/api";

  //obtem todos os produtos do banco de dados
  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL + "/produtos");
  }

  //registra um novo produto no banco de dados
  registerProduct(product) : Observable<any>{
    let body = new HttpParams();
    body = body.set("title", product.title);
    body = body.set("price", String(product.price));
    body = body.set("description", product.description);
    return this.http.post(this.baseURL + "/produtos", body, {observe: "response"});
  }

  //atualiza um produto no banco de dados
  updateProduct(product, id:string) : Observable<any>{
    let body = new HttpParams();
    body = body.set("title", product.title);
    body = body.set("price", String(product.price));
    body = body.set("description", product.description);
    return this.http.put(this.baseURL + "/produtos/" + id, body, {observe: "response"});
  }

  //deleta um produto no banco de dados
  deleteProduct(id:string) : Observable<any>{
    return this.http.delete(this.baseURL + "/produtos/" + id, {observe: "response"});
  }
  constructor(private http : HttpClient) { }
}
