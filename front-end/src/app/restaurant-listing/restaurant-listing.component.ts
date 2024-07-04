import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/services/api/api.flowchart_service';
import * as _ from 'lodash';
import { CommonService } from 'src/services/common.service';
import { Router } from '@angular/router';

export interface IRestaurant {
  restaurant_id?: number;
  restaurant_name: string;
  address_id: number;
  mapped_user_id: number;
  city_name: string;
  city_id: number;
  state_name: string;
  state_id: number;
  address_line1: string;
}
@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrl: './restaurant-listing.component.scss'
})

export class RestaurantListingComponent {

  filterText!: string;
  restaurantList: Array<IRestaurant> = [];
  filteredRestaurantList: Array<IRestaurant> = [];
  isEditMode: Boolean = false;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;

  restaurantDetails!: any;
  isPopupOpen: boolean = false;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('closeRestaurantModel') closeRestaurantModel!: ElementRef;

  constructor(private apiservice: ApiService, private utility: CommonService, private router: Router) {
  }
  ngOnInit() {
    this.getRetaurantListings();
  }

  onSearchTextBoxChanged() {
    if (this.filterText.length) {
      const filtered_array: any = _.filter(this.restaurantList, _.flow(
        _.partial(_.omit),
        _.partial(
          _.some, _,
          _.flow(_.toLower, _.partial(_.includes, _, _.toLower(this.filterText), 0))
        )
      ));
      if (filtered_array.length) {
        this.filteredRestaurantList = filtered_array;
      }
      else {
        this.filteredRestaurantList = [];
      }
    }
    else {
      this.getRetaurantListings();
    }
  }
  getRetaurantListings() {
    let url = 'get-restaurants';
    // url += `&page_number${this.pageNumber}&page_size=${this.pageSize}`;
    this.apiservice.getRequest(url).subscribe(res => {
      if (res.code == 201) {
        this.restaurantList = res.data;
        this.totalRecords = res.total_records;
        this.filteredRestaurantList = _.cloneDeep(this.restaurantList)
      }
      else {
        this.restaurantList = [];
      }
    });
  }
  resetRestaurantForm() {
    this.isPopupOpen = false;

  }
  onSaveEmit(event: Event) {
    if (event) {
      // we emit true in case we have saved and false in case we have clicked on cancel
      this.getRetaurantListings();
    }
    this.isEditMode = false;
    this.closeRestaurantModel.nativeElement.click();
  }
  editRestaurantModal(param: Object) {
    this.restaurantDetails = param;
    this.isEditMode = true;
    console.log(this.restaurantDetails)
  }
  onPageChange() {
    this.getRetaurantListings();
  }
  navigate(id?: number) {
    this.utility.showBackButton = true;
    this.router.navigate([`/restaurant-detail/${id}`])
  }
}
