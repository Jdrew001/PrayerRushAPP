import { Component } from '@angular/core';
import { NavController, Spinner } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Dialogs } from '@ionic-native/dialogs';
import { Storage } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { TabsPage } from '../tabs/tabs';
import { RegistrationPage } from '../registration/registration';
import {Platform} from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    user = {};
    form: FormGroup;

    constructor(public plt: Platform, public navController: NavController, private authService: AuthService, private formBuilder:FormBuilder, private dialogs: Dialogs, private storage: Storage,
        private nativeTrans: NativePageTransitions, private spinnerDialog: SpinnerDialog) {
        this.form = formBuilder.group({
            email: '',
            password: ''
        });
        plt.ready().then(() => {
            this.spinnerDialog.show();
            setTimeout(() => {
                this.checkForToken();
                this.spinnerDialog.hide();
            }, 3000);
        });
    }

    checkForToken() {
        this.storage.get('token').then((val) => {
            this.authService.checkJwtToken(val).subscribe(data => {
                this.nativeTrans.fade(null);
                this.navController.setRoot(TabsPage);
            }, error => {
                console.log(error["error"]["error"]);
                //todo decide if I want this here this.dialogs.alert("You have been logged out. Please login to continue.", "Authentication");
            });
            
        });
    }

    login() {
        this.spinnerDialog.show();
        setTimeout(() => {
            this.authService.login(this.form.value.email, this.form.value.password)
                .subscribe(data => {
                    this.storage.remove("token");
                    this.storage.set("token", data["token"]);
                    this.nativeTrans.fade(null);
                    this.navController.setRoot(TabsPage);
                }, error => {
                    this.dialogs.alert("Login attempt unsuccessful, please try again", "Login Failure");
            });
            this.spinnerDialog.hide();
        }, 2000);  
    }

    goToRegisterPage() {
        let options = {
            direction : 'left',
            duration : 400,
            slowdownfactor : -1,
            iosdelay : 50
        }
        this.nativeTrans.fade(null);
        this.navController.push(RegistrationPage);
    }
}