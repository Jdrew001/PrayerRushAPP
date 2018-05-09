import { Component, OnDestroy } from '@angular/core';
import { NavController, List, App, Events } from 'ionic-angular';
import { RequestService } from '../../services/requests.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Storage } from '@ionic/storage';
import { AddRequest } from './addRequest';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';

@Component({
  selector: 'page-request',
  templateUrl: 'PrayerRequest.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(10, 
            [ animate('0.2s 0.1s ease-in-out'), style({ opacity: 0})])
        ],{ optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(20, [
            animate('0.2s 0.1s ease-in-out', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class PrayerRequest implements OnDestroy {

  requests : List[] = [];
  
  constructor(public navCtrl: NavController, private app: App, private navTrans: NativePageTransitions, public events: Events, private requestService : RequestService, private storage:Storage) {
    this.events.unsubscribe('request-added');
    this.events.subscribe('request-added', (data) => {
      console.log(data);
      this.requests.unshift(data);
    });
  }

  ngOnDestroy() {
    console.log("Component destroyed");
  }

  ionViewDidLoad() {
    this.loadRequests();
  }

  showAddRequest() {
    // show modal screen
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 350
    };
    this.navTrans.slide(options);
    this.app.getRootNav().push(AddRequest, { "PrayerRequest" : this });
  }

  private loadRequests() {
    this.requests = [];
    this.storage.get("email").then(email => {
      this.storage.get("token").then(token => {
        this.requestService.getRequests(email, token)
          .subscribe(data => {
             this.requests = data as List[];
          }, error => {

          });
      });
    });
  }
}
