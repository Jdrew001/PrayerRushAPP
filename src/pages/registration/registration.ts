import { Component } from '@angular/core';
import { NavController, Spinner } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Dialogs } from '@ionic-native/dialogs';
import { Storage } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { TabsPage } from '../tabs/tabs';
import {Platform} from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html'
})
export class RegistrationPage {
    user = {};
    form: FormGroup;
    constructor(public navController: NavController, private formBuilder:FormBuilder, private spinnerDialog: SpinnerDialog, private authService: AuthService,
        private storage: Storage, private dialog: Dialogs, private nativeTrans:NativePageTransitions) {
        this.form = formBuilder.group({
            email: '',
            password: '',
            confirmPassword: ''
        });
    }

    //register new user
    register() {
        this.spinnerDialog.show();
        setTimeout(() => {
            this.authService.register(this.form.value.email, this.form.value.password)
                .subscribe(data => {
                    this.storage.remove("token");
                    this.storage.set("token", data["token"]);
                    this.nativeTrans.fade(null);
                    this.navController.setRoot(TabsPage);
                }, error => {
                    if(error["error"]["status"] === 400)
                    {
                        this.dialog.alert(error["error"]["message"], "Registration Failure");
                    }
                });

            this.spinnerDialog.hide();
        });
    }
}