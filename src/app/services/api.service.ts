
import { HttpClient , HttpHeaders} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment"

@Injectable({
    providedIn: 'root'
})
export class APIService {
    authToken = localStorage.getItem('accessToken')
    constructor(private http:HttpClient){}
    getData(url: string) {

        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            'authorization': `Bearer ${this.authToken}`
        })
        return this.http.get(environment.url + url, { 'headers': headers });
    }

    postData(value:any, url: string) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            'authorization': `Bearer ${this.authToken}`
        })
        return this.http.post(environment.url +
            url, JSON.stringify(value),
            { 'headers': headers });
    }
}