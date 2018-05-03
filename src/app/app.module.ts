import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Dialogs } from '@ionic-native/dialogs';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { stagger } from '@angular/animations';

import { ModalPage } from '../pages/modal/modal';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { SettingsPage } from '../pages/settings/settings';
import { FeedbackPage } from '../pages/feedback/feedback';
import { PrayerList } from '../pages/prayerlist/PrayerList';
import { PrayerRequest } from '../pages/prayerrequest/PrayerRequest';
import { Goals } from '../pages/goals/Goals';
import { AddList } from '../pages/prayerlist/addlist';
import { FriendsPage } from '../pages/friends/friends';
import { AddFriend } from '../pages/friends/addFriend';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ListService } from '../services/list.service';
import { FriendService } from '../services/friend.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { IonicPageModule } from 'ionic-angular';

import { AnimationService, AnimatesDirective } from 'css-animator';

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
    AddList,
    PrayerRequest,
    Goals,
    FriendsPage,
    AddFriend,
    AnimatesDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    AddList,
    PrayerRequest,
    Goals,
    FriendsPage,
    AddFriend
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    UserService,
    ListService,
    FriendService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Dialogs,
    NativePageTransitions,
    SpinnerDialog,
    AnimationService
  ]
})
export class AppModule {}
