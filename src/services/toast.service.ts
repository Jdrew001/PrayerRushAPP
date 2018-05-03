import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastService { 


    constructor(private toast: ToastController) { }

    showBottomShort(message) {
        let toast = this.toast.create({
            message: message,
            duration: 2000,
            position: 'bottom'
          });

        toast.present();
    }

}