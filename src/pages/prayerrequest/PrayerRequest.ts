import { Component, OnDestroy } from '@angular/core';
import { NavController, List, Events } from 'ionic-angular';
import { RequestService } from '../../services/requests.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-request',
  templateUrl: 'PrayerRequest.html'
})
export class PrayerRequest implements OnDestroy {

  requests : List[] = [];
  
  constructor(public navCtrl: NavController, public events: Events, private requestService : RequestService, private storage:Storage) {
    this.events.unsubscribe('request-added');
    this.events.subscribe('request-added', (data) => {
      this.requests.unshift(data);
    });
  }

  ngOnDestroy() {
    console.log("Component destroyed");
  }

  ionViewDidLoad() {
    this.loadRequests();
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
