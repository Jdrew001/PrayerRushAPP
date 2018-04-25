import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Dialogs } from '@ionic-native/dialogs';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ModalPage } from '../pages/modal/modal';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ModalPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistrationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModalPage,
    LoginPage,
    RegistrationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Dialogs,
    NativePageTransitions,
    SpinnerDialog
  ]
})
export class AppModule {}
