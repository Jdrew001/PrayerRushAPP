import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, List, App, Item, ItemSliding } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Platform} from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { ModalPage } from '../../pages/modal/modal';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ListService } from '../../services/list.service';
import { AddList } from '../prayerlist/addlist';
import { TabsPage } from '../tabs/tabs';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';

@Component({
  selector: 'page-list',
  templateUrl: 'PrayerList.html',
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
export class PrayerList implements OnInit {

  email : String;
  token : String;
  //eventually create a model TODO
  list:List[] = [];
  dataList: List[] = [];
  activeItemSliding: ItemSliding = null;

  helper = new JwtHelperService();
  @ViewChild('listItem') element;

  constructor(public navCtrl: NavController, private storage: Storage, public plt: Platform, private userService: UserService,
  private navTrans: NativePageTransitions, private listService : ListService, private app: App) {
    
    
  }

  ngOnInit() {
    
  }

  ionViewDidLoad() {
    this.loadLists();
    
  }

  openOption(itemSlide: ItemSliding, item: Item) {
      console.log('opening item slide..');
      
      if(this.activeItemSliding!==null) //use this if only one active sliding item allowed
      this.closeOption();
  
      this.activeItemSliding = itemSlide;
  
      let swipeAmount = 125; //set your required swipe amount
      itemSlide.startSliding(swipeAmount);
      itemSlide.moveSliding(swipeAmount);
  
      itemSlide.setElementClass('active-options-right', true);
      itemSlide.setElementClass('active-swipe-right', true);
  
      item.setElementStyle('transition', null);
      item.setElementStyle('transform', 'translate3d(-'+swipeAmount+'px, 0px, 0px)');
    }
  
    closeOption() {
      console.log('closing item slide..');
  
      if(this.activeItemSliding) {
        this.activeItemSliding.close();
        this.activeItemSliding = null;
      }
   }

  showAddListPage() {
    // show modal screen
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 350
    };
    this.navTrans.slide(options);
    this.app.getRootNav().push(AddList, { "PrayerList" : this });
  }

  loadLists() {
    this.storage.get("email").then(email => {
      this.email = email;
      this.storage.get("token").then((token) => {
        this.token = token;
        this.listService.getUserLists(this.email, this.token)
          .subscribe(data => {
            this.list = data as List[];
          }, error => {

          });
      });
    });
  }

  addToList(listItem : List) {
    this.list.push(listItem);
  }

  updateItem(item) {
    // show modal screen
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 350
    };
    this.navTrans.slide(options);
    this.app.getRootNav().push(AddList, { "PrayerList" : this, "list" : item });
  }

  deleteListItem(item) {
    this.storage.get("email").then(email => {
      this.email = email;
      this.storage.get("token").then((token) => {
        this.token = token;
        this.listService.deleteUserList(this.email, item.listId, item.name, item.description, item.date, token)
          .subscribe(data => {
            //this.loadLists();
            var index = this.list.indexOf(item, 0);
            if(index > -1) {
              this.list.splice(index, 1);
            }
          }, error => {

          });
      });
    });
  }
}
