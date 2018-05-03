import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../utilities/Constants';

@Injectable()
export class FriendService {

    constructor(private httpClient : HttpClient) {}

    //get all user friends
    getUserFriends(email : string, token : string) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.httpClient.post(Constants.BASE_URL+'api/user/friends', { email }, { headers });
    }

    //get user friend requests
    getFriendRequests(email : string, token : string) {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Token ' + token
        });

        return this.httpClient.post(Constants.BASE_URL+'api/user/friend/requests', { email }, { headers });
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