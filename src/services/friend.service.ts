import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../utilities/Constants';

@Injectable()
export class FriendService {
    firstname : String;
        lastname : String;
        email : String;

    constructor(private httpClient : HttpClient) {}

    //search for users
    getUsers(email : string, mainEmail : string, token : string) {
        
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.httpClient.post(Constants.BASE_URL+'api/user/search/'+mainEmail, { email }, { headers });
    }

    //get all user friends
    getUserFriends(email : string, token : string) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.httpClient.post(Constants.BASE_URL+'api/user/friends', { email }, { headers });
    }

    //remove User friend
    removeFriend(email : string, mainEmail : string, token : string) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.httpClient.post(Constants.BASE_URL+'api/user/friend/remove/'+mainEmail, { email }, { headers });
    }

    //get user friend requests
    getFriendRequests(email : string, token : string) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.httpClient.post(Constants.BASE_URL+'api/user/friend/requests', { email }, { headers });
    }

    //get user friends that he requested to be friends with
    getRequestedFriends(email : string, token : string) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.httpClient.post(Constants.BASE_URL+'api/user/friend/requested', { email }, { headers });
    }

    //add friend requests
    addFriendRequests(email : string, mainEmail : string, token : string) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.httpClient.post(Constants.BASE_URL+'api/user/friend/requests/add/'+mainEmail, { email }, { headers });
    }

    //decline friend request
    declineFriendRequest(email : string, userEmail: string, token : string) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.httpClient.post(Constants.BASE_URL+'api/user/friend/requests/remove/'+userEmail, { email }, { headers });
    }

    //accept friend request
    acceptFriendRequest(email : string, userEmail : string, token : string) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.httpClient.post(Constants.BASE_URL+'api/user/friend/acceptPending/'+userEmail, { email }, { headers });
    }
}