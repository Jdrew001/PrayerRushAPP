import { Component } from '@angular/core';
import { NavController, NavParams, List } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FriendService } from '../../services/friend.service';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';


@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(10, 
            [ animate('0.2s'), style({ opacity: 0})])
        ],{ optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(20, [
            animate('0.2s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class FriendsPage {

  list:List[] = [];
  requests:List[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private friendService : FriendService, private storage : Storage) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad FriendsPage');
    this.loadUserFriends();
    this.loadFriendRequests();
  }

  itemClick() {
    console.log("Test");
  }

  loadUserFriends() {
    this.list = [];
    this.storage.get("email").then(email => {
      this.storage.get("token").then(token => {
        this.friendService.getUserFriends(email, token)
          .subscribe(data => {
            this.list = data as List[];
          }, error => {
            console.log(error["message"]);
          });
      });
    });
  }

  loadFriendRequests() {
    this.requests = [];
    this.storage.get("email").then(email => {
      this.storage.get("token").then(token => {
        this.friendService.getFriendRequests(email, token)
          .subscribe(data => {
            this.requests = data as List[];
          }, error => {
            console.log(error["message"]);
          })
      });
    });
  }

  declineRequest(request) {
    this.storage.get("email").then(email => {
      this.storage.get("token").then(token => {
        this.friendService.declineFriendRequest(request.email, email, token)
          .subscribe(data => {
            var index = this.requests.indexOf(request, 0);
            if(index > -1)
              this.requests.splice(index, 1);
          }, error => {
            console.log(error["error"]);
          });
      });
    });
  }

  acceptRequest(request) {
    this.storage.get("email").then(email => {
      this.storage.get("token").then(token => {
        this.friendService.acceptFriendRequest(request.email, email, token)
          .subscribe(data => {
            var index = this.requests.indexOf(request, 0);
            if(index > -1)
              this.requests.splice(index, 1);

              this.list.push(request);
          }, error => {
            console.log(error["error"]);
          });
      });
    });
  }

}
