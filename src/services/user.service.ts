import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../utilities/Constants';

@Injectable()
export class UserService {

    constructor(private http: HttpClient){}

    //check user information
    checkUserInformation(email : String, token : String) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.http.post(Constants.BASE_URL+'api/user/check', { email }, {headers});
    }

    //get the user information from the server
    getUserInformation(email : String, token : String) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.http.post(Constants.BASE_URL+'api/user/details', { email }, {headers});
    }

    //this will update the user information when called and return a response from server
    updateUserInformation(email: String, username: String, firstname: String, lastname: String, token:String) {
        let headers = new HttpHeaders({
            'Content-Type' : "application/json",
            'Authorization' : 'Token ' + token
        });

        return this.http.post(Constants.BASE_URL+'api/user/update', { email, username, firstname, lastname}, {headers});
    }

}