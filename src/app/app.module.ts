import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Dialogs } from '@ionic-native/dialogs';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { ModalPage } from '../pages/modal/modal';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { SettingsPage } from '../pages/settings/settings';
import { FeedbackPage } from '../pages/feedback/feedback';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { IonicPageModule } from 'ionic-angular';
import { PrayerList } from '../pages/prayerlist/PrayerList';
import { PrayerRequest } from '../pages/prayerrequest/PrayerRequest';
import { Goals } from '../pages/goals/Goals';

@NgModule({
  declarations: [
    MyApp,
    ModalPage,
    TabsPage,
    LoginPage,
    RegistrationPage,
    SettingsPage,
    FeedbackPage,
    PrayerList,
    PrayerRequest,
    Goals
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
    TabsPage,
    ModalPage,
    LoginPage,
    RegistrationPage,
    SettingsPage,
    FeedbackPage,
    PrayerList,
    PrayerRequest,
    Goals
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
