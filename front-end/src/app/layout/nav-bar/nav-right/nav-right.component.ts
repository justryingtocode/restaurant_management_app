import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { DattaConfig } from '../../../app-config';
import { Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { ApiService } from 'src/services/api/api.flowchart_service';
// import { ApiService } from 'src/app/services/api.service';
// import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: "app-nav-right",
  templateUrl: "./nav-right.component.html",
  styleUrls: ["./nav-right.component.scss"],
  providers: [NgbDropdownConfig],
  animations: [
    trigger("slideInOutLeft", [
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("300ms ease-in", style({ transform: "translateX(0%)" })),
      ]),
      transition(":leave", [
        animate("300ms ease-in", style({ transform: "translateX(100%)" })),
      ]),
    ]),
    trigger("slideInOutRight", [
      transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("300ms ease-in", style({ transform: "translateX(0%)" })),
      ]),
      transition(":leave", [
        animate("300ms ease-in", style({ transform: "translateX(-100%)" })),
      ]),
    ]),
  ],
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean | undefined;
  public chatMessage: boolean | undefined;
  public friendId: boolean | undefined;
  public dattaConfig: any;
  userType: any;
  userInfo: any;
  phoneNumber: any;
  constructor(
    config: NgbDropdownConfig,
    public router: Router,
    public commonService: CommonService,
    private apiService: ApiService
  ) {
    config.placement = "bottom-right";
    this.dattaConfig = DattaConfig.config;
    this.commonService.getFacilityDetails().subscribe((data: any) => {
      this.userInfo = data;
    });
    // this.userDetails = JSON.parse(localStorage.getItem("pharmacyDetails"));
  }
  ngOnInit() {
    this.getUserInfo();
  }
  ngOnChanges(changes: SimpleChanges) {
  }
  ngDoCheck() {
    if (document.querySelector("body")?.classList.contains("datta-rtl")) {
      this.dattaConfig["rtl-layout"] = true;
    } else {
      this.dattaConfig["rtl-layout"] = false;
    }
  }

  getUserInfo() {
    console.log(this.phoneNumber)
  }

  logout() {
      localStorage.clear()
      this.router.navigate(["/login"]);
  }
  routeToProfile() {
    this.router.navigate([""]);
  }
}
