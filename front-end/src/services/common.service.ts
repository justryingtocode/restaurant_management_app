import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
    providedIn: 'root'
  })
export class CommonService {
    public showBackButton: boolean = false;
    private facilityInfo = new Subject<any>();
    private data: any; // Your actual data
    constructor(  public router: Router) {
    }
    getFacilityDetails(): Observable<any> {
        if (localStorage.getItem("token")) {
            let tokenInfo: any = jwt_decode(localStorage.getItem("token")!);
            return this.facilityInfo.asObservable();
          } else {
            localStorage.clear();
            this.router.navigate(["/login"]);
            return this.facilityInfo.asObservable();
          }
       
    }
    setFacilityDetails(newData: any) {
        this.data = newData;
        this.facilityInfo.next(this.data);
    }

}