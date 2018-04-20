import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SuperTabsController } from 'ionic2-super-tabs';

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs-page'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private superTabsCtrl: SuperTabsController) {
    
  }

  ngAfterViewInit()
  {
    this.superTabsCtrl.showToolbar(true);
  }
}
