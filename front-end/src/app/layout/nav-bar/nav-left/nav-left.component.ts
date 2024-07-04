import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { CommonService } from 'src/services/common.service';
// import { UtilityService } from './../../../services/utility.service';
@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit {
  constructor(private _location:Location, public utility: CommonService
   ) { }

  ngOnInit() {
    // this.utility.showBackButton = true;
  }

  backNavigation() {
    this._location.back();
     this.utility.showBackButton = false;
  }
}
