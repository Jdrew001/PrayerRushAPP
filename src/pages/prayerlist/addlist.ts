import { Component } from '@angular/core';
import { NavController, List, App, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ListService } from '../../services/list.service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-add-list',
    templateUrl: 'addlist.html'
})
export class AddList {

    form: FormGroup;
    list: any;
    update: boolean = false;

    constructor(public navController: NavController, private formBuilder: FormBuilder, private app: App, private navTrans: NativePageTransitions,
        private listService: ListService, private storage : Storage, private navParams : NavParams) {
            console.log(this.navParams.get("list"));
            if(this.navParams.get("list") != null) {
                this.form = formBuilder.group({
                    name: this.navParams.get("list").name,
                    description: this.navParams.get("list").description
                });

                this.update = true;
            } else {
                this.form = formBuilder.group({
                    name: '',
                    description: ''
                });

                this.update = false;
            }
        
    }

    close() {
        this.navController.pop();
    }

    addList() {
        if(this.update) {
            this.storage.get("email").then(email => {
                this.storage.get("token").then(token => {
                    this.list = this.navParams.get("list");
                    this.listService.updateUserListItem(email, token, +this.list.listId, this.form.value.name, this.form.value.description, this.list.date)
                    .subscribe(data => {
                        this.navController.pop();
                        this.navParams.get("PrayerList").loadLists();
                    }, error => {
                      console.log(error["message"]);
                    })
                });
              });
        } else {
            this.storage.get('email').then((email) => {
                this.storage.get('token').then((token) => {
                    this.listService.addNewList(this.form.value.name, this.form.value.description, email, token)
                        .subscribe(data => {
                            this.navController.pop();
                            this.navParams.get("PrayerList").loadLists();
                        }, error => {
                            console.log(error["message"]);
                        });
                });
            });
        }        
    }
}