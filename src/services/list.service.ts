import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../utilities/Constants';

@Injectable()
export class ListService {

    constructor(private http: HttpClient) { }

    //add
    addNewList(name: string, description: string, email: string, token : string) {
        let headers = new HttpHeaders({
            "Content-Type" : "application/json",
            "Authorization" : "Token " + token
        });

        return this.http.post(Constants.BASE_URL+"api/list/addUserList/"+email, {name, description}, { headers : headers});
    }

    //get
    getUserLists(email : String, token : String) {
        let headers = new HttpHeaders({
            "Content-Type" : "application/json",
            "Authorization" : "Token " + token
        });

        return this.http.post(Constants.BASE_URL+"api/list/getUserList", { email }, { headers });
    }

    updateUserListItem(email : string, token : string, listId : number, name : string, description : string, date : string) {
        let headers = new HttpHeaders({
            "Content-Type" : "application/json",
            "Authorization" : "Token " + token
        });

        return this.http.post(Constants.BASE_URL+"api/list/updateListItem/"+email, {listId, name, description, date}, { headers : headers});
    }

    deleteUserList(email : String, listId: string, name: string, description:string, date:string, token:string) {
        let headers = new HttpHeaders({
            "Content-Type" : "application/json",
            "Authorization" : "Token " + token
        });

        return this.http.post(Constants.BASE_URL+"api/list/deleteUserList/"+email, {listId, name, description, date}, { headers : headers});
    }
}