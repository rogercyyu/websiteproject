import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments//environment';
import { FormGroup } from '@angular/forms';

const BASEURL = environment.apiUrl;

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get(`${BASEURL}/products`);
  }

  public getOne(id): Observable<any> {
    return this.http.get(`${BASEURL}/product/${id}`);
  }

  public getProducts(page, category): Observable<any> {
    const perPage = 9;

    let params = {
      page: page,
      perPage: perPage.toString(),
    };

    if (category != null || category != undefined) {
      params['category'] = category;
    }

    console.log(params);

    return this.http.get(`${BASEURL}/product`, { params });
  }

  create(body: any): Observable<any> {
    console.log(body);
    return this.http.post(`${BASEURL}/product`, body);
  }

  upload(body: FormGroup, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    Object.keys(body.controls).forEach((key) => {
      formData.append(key, body.get(`${key}`).value);
    });

    formData.append('file', file);

    const req = new HttpRequest('POST', `${BASEURL}/product`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  uploadUpdate(
    id: string,
    body: FormGroup,
    file: File
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('product_id', id);

    Object.keys(body.controls).forEach((key) => {
      if (body.get(`${key}`).value !== null)
        formData.append(key, body.get(`${key}`).value);
    });

    if (file !== undefined) formData.append('file', file);

    const req = new HttpRequest('POST', `${BASEURL}/product/${id}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
}
