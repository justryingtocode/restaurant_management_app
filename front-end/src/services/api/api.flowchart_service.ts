// src/app/api/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appConfig } from '../../config/appConfig.development';
import jwt_decode from "jwt-decode";
import { of } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';

const basePath = appConfig.apiBasePath;

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http: HttpClient) { }

  // put
  putData(url: string, data: any): Observable<any> {
    let url1 = `${basePath}${url}`;
    return this.http.put(url1, data);
  }
  // post
  postRequest(url: string, data: any): Observable<any> {

    let url1 = `${basePath}${url}`;
    return this.http.post(url1, data);
  }

  // delete
  deleteData(url: string): Observable<any> {
    return this.http.delete(url);
  }

  // post
  createProgram(data: any): Observable<any> {

    const {
      account_id = 1,
      target_contact_type,
      program_title,
      start_at,
      end_at,
      flowchart_data
    } = data;

    const body = {
      account_id,
      target_contact_type,
      program_title,
      start_at,
      end_at,
      flowchart_data: { cells: flowchart_data.cells }
    }

    const url = `${basePath}/programs`;
    return this.http.post(url, body);
  }

  deleteRequest(url: any = {}, hasBodyData?: boolean): Observable<any> {
    let urlPath = `${basePath}/${url}`;
    return this.http.delete(urlPath);
  }
  // Get 
  getRequest(url1: any = {}): Observable<any> {

    let url = basePath + url1;
    return this.http.get(url);
  }
  login(data: any): Observable<any> {

    const body = {
      ...data
    }

    const url = `${basePath}login`;
    return this.http.post(url, body);
  }
  isTokenExpired() {
    if (localStorage.getItem("token")) {
      let tokenInfo: any = jwt_decode(localStorage.getItem("token")!);
      console.log(tokenInfo)
      let expireDate = tokenInfo.exp * 1000;
      if (expireDate < Date.now()) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

}
