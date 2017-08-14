import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReadypackageDetailsPage } from './../readypackage-details/readypackage-details';

/**
 * Generated class for the ReadyPackagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-ready-package',
  templateUrl: 'ready-package.html',
})
export class ReadyPackagePage {

  showToolbar: boolean = false;

  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef, public navParams: NavParams) {
  }
   onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  readyHoneymoon(){
    this.navCtrl.push(ReadypackageDetailsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadyPackagePage');
  }

}
