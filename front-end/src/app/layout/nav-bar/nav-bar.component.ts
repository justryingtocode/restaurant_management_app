import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DattaConfig} from '../../app-config';
import { NavigationEnd, Router } from '@angular/router';
// import { environment } from '../../../environments/environment.development';
// import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() onNavCollapsedMob = new EventEmitter();
  public dattaConfig: any;
  public navCollapsedMob;
  public headerStyle: string;
  public menuClass: boolean;
  public collapseStyle: string;

  constructor(  private router: Router) {
    this.dattaConfig = DattaConfig.config;
    this.navCollapsedMob = false;
    this.headerStyle = '';
    this.menuClass = false;
    this.collapseStyle = 'none';
  }

  ngOnInit() {
  }
  
  redirect(){
      this.router.navigate(['']);
  }

  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.headerStyle = (this.menuClass) ? 'none' : '';
    this.collapseStyle = (this.menuClass) ? 'block' : 'none';
  }

}
