import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {  Router } from '@angular/router';
// import { environment } from '../../../../environments/environment.development';
// import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-nav-logo',
  templateUrl: './nav-logo.component.html',
  styleUrls: ['./nav-logo.component.scss']
})
export class NavLogoComponent implements OnInit {
  @Input() navCollapsed: boolean | undefined;
  @Output() onNavCollapse = new EventEmitter();
  public windowWidth: number;
  // imageBaseUrl: string;

  title ="FoodieDelight";
  constructor(
    private router: Router
  ) {
    this.windowWidth = window.innerWidth;
    // this.title = environment.company;
    // this.imageBaseUrl = environment.imagesPath
  }



  ngOnInit() {
  }

  redirect(){
    let role = localStorage.getItem('userType');
  }

  navCollapse() {
    console.log('erer')
    if (this.windowWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
      // console.log("nav-collapdse for navlogocomponent", this.navCollapse);
      this.onNavCollapse.emit();
    }
  }

}
