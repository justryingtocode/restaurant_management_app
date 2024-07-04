import {Component, Input, OnInit} from '@angular/core';
import {NavigationItem} from '../../navigation';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {DattaConfig} from '../../../../app-config';
import { Router, ActivatedRoute } from '@angular/router';
// import { environment } from '../../../../../environments/environment.development';
// import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-nav-collapse',
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)', display: 'block'}),
        animate('250ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ],
})
export class NavCollapseComponent implements OnInit {
  public visible;
  public IsChildVisible;
  @Input() item: NavigationItem | undefined;
  public dattaConfig: any;
  public themeLayout: string;
  public userType: string = '';

  constructor(private router: Router) {
    this.visible = false;
    this.IsChildVisible = false
    this.dattaConfig = DattaConfig.config;
    this.themeLayout = this.dattaConfig['layout'];
    // this.userType = localStorage.getItem('userType')
  }

  ngOnInit() {
  }
  changeTab(val: any){
    console.log("value nav-collapse==>",val);
    if(val && val.children) {
      this.IsChildVisible = true
    } else {
      this.IsChildVisible = false
      if(val && val.url) {
        this.router.navigate([val.url]);
      //   if((val.id == 'doctor' || val.id == 'appointment' ) && localStorage.getItem('userType') == 'doctor') {
      //    let userDetails : any = JSON.parse(localStorage.getItem('userInfo'))
      //    this.router.navigate([val.url], { queryParams: { doctorId: userDetails.userName}});
      //   } else {
      //    this.router.navigate([val.url]);
      // }
    }
    }
  }

  navCollapse(e: any) {
   if(this.IsChildVisible) {
    this.visible = !this.visible;

    let parent = e.target;
    if (this.themeLayout === 'vertical') {
      parent = parent.parentElement;
    }

    const sections = document.querySelectorAll('.pcoded-hasmenu');
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] !== parent) {
        sections[i].classList.remove('pcoded-trigger');
      }
    }

    let first_parent = parent.parentElement;
    let pre_parent = parent.parentElement.parentElement;
      if (first_parent.classList.contains('pcoded-hasmenu')) {
        do {
          first_parent.classList.add('pcoded-trigger');
          // first_parent.parentElement.classList.toggle('pcoded-trigger');
          first_parent = first_parent.parentElement.parentElement.parentElement;
        } while (first_parent.classList.contains('pcoded-hasmenu'));
      } else if (pre_parent.classList.contains('pcoded-submenu')) {
        do {
          pre_parent.parentElement.classList.add('pcoded-trigger');
          pre_parent = pre_parent.parentElement.parentElement.parentElement;
        } while (pre_parent.classList.contains('pcoded-submenu'));
      }
      parent.classList.toggle('pcoded-trigger');
  }
}

getImageUrl(url: any){
  if(url.includes('assets')){
    return true;
  } else {
    return false;
  }
}

get isOpen() {
  return true;
}

}
