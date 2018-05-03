import { Component } from '@angular/core';
import { NavController, NavParams, List } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastService } from '../../services/toast.service';
import { FriendService } from '../../services/friend.service';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';

@Component({
    selector: 'page-add-friends',
    templateUrl: 'addFriend.html',
    animations: [
        trigger('listAnimation', [
          transition('* => *', [
            query(':leave', [
              stagger(20, 
                [ animate('0.2s  ease-in-out'), style({ opacity: 0})])
            ],{ optional: true }),
            query(':enter', [
              style({ opacity: 0 }),
              stagger(20, [
                animate('0.2s  ease-in-out', style({ opacity: 1 }))
              ])
            ], { optional: true })
          ])
        ])
      ]
  })
export class AddFriend { 

    searchText : string;
    users : List[] = [];
    requestedFriends : List[] = [];
    empty = true;
    requested = false;

    constructor(private navController : NavController, private friendService: FriendService, private storage: Storage, private toastService: ToastService) {}

    close() {
        this.navController.pop();
    }

    ionViewWillEnter() {
        this.retrieveRequestedFriends();
    }

    search() {
        this.users = [];
        this.storage.get("token").then(token => {
            this.storage.get("email").then(email => {
                this.friendService.getUsers(this.searchText, email, token)
                .subscribe(data => {
                    this.users = data as List[];
                    if(this.users.length == 0)
                    {
                        this.empty = true;
                    } else {
                        this.empty = false;
                    }
                }, error => {
                    console.log(error["message"]);
                });
            }).catch(() => {
                console.log("Error");
            });
        });
        
    }

    requestFriend(user) {
        this.storage.get("token").then(token => {
            this.storage.get("email").then(email => {
                this.friendService.addFriendRequests(user.email, email, token)
                    .subscribe(data => {
                        this.users = [];
                        this.toastService.showBottomShort("Successfully requested")
                    }, error => {
                        console.log(error["message"]);
                    });
            });
        });
    }

    retrieveRequestedFriends() {
        this.storage.get("token").then(token => {
            this.storage.get("email").then(email => {
                this.friendService.getRequestedFriends(email, token)
                    .subscribe(data => {
                        //add all the requested friends of the users to a list
                        this.requestedFriends = data as List[];
                    }, error => {

                    });
            });
        });
    }
}