import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../utilities/Constants';

@Injectable()
export class RequestService {

    constructor(private http: HttpClient) {}

    //get all requests
    getRequests(email : string, token) {
        let headers = new HttpHeaders({
            "Content-Type" : "application/json",
            "Authorization" : "Token " + token
        });

        return this.http.post(Constants.BASE_URL+"api/request/all", { email }, { headers })
    }
}