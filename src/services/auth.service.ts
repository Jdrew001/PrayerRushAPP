import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../utilities/Constants';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    login(email: String, password: String) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(Constants.BASE_URL+'login',{ email,  password },{headers});
    }

    checkJwtToken(token:string) {
        console.log(token);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : "Token " + token
        });
        return this.http.get(Constants.BASE_URL+'api', {headers});
    }

    register(email: String, password: String) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(Constants.BASE_URL+'register', {email, password}, {headers});
    }
}