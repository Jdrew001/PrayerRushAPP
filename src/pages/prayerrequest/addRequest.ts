import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-addrequest',
    templateUrl: 'addRequest.html'
})
export class AddRequest {

    form: FormGroup;

    constructor(public navController: NavController, private formBuilder: FormBuilder, private app : App) {
        this.form = formBuilder.group({
            description: ''
        });
    }

    close() {
        this.navController.pop();
    }

}