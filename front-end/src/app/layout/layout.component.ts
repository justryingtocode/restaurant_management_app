import { Component } from '@angular/core';
import { DattaConfig } from '../app-config';
import { ApiService } from 'src/services/api/api.flowchart_service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public navCollapsedMob: boolean | undefined;
  public navCollapsed: boolean | undefined;
  public dataConfig: any;
  constructor(private apiService: ApiService,private router: Router) {
    this.dataConfig = DattaConfig.config;
   
    // this.windowWidth = window.innerWidth;
    // this.navCollapsed = (this.windowWidth >= 992) ? this.dataConfig['collapse-menu'] : false;
    this.navCollapsedMob = false;
  }

  get isOpen() {
    return true;
  }
  ngOninit() {
    console.log('sadasd')
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  navMobClick() {
    if (this.navCollapsedMob && !(document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open'))) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }
}
