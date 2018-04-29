import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Platform} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {

    form: FormGroup;
    helper = new JwtHelperService();
    email : String;

  constructor(public navCtrl: NavController, private storage: Storage, private platform: Platform, private formBuilder:FormBuilder, private userService: UserService) {
    this.form = formBuilder.group({
        username: '',
        firstname: '',
        lastname: ''
    });
    this.platform.registerBackButtonAction(() => {

    });
  }

  updateUserInformation() {
    this.storage.get('token').then((token) => {
        this.email = this.helper.decodeToken(token)["email"];
        this.userService.updateUserInformation(this.email, this.form.value.username, this.form.value.firstname, this.form.value.lastname, token)
        .subscribe(data => {
            this.navCtrl.pop();
            this.storage.set("username", this.form.value.username);
            this.storage.set("firstname", this.form.value.firstname);
            this.storage.set("lastname", this.form.value.lastname);
            this.storage.set("email", this.email);
        }, error => {
            console.log(error);
        });
    });
  }
}