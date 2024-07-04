import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/services/api/api.flowchart_service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export interface Istates {
  state_id: number;
  description: string;
}
export interface Icities {
  city_id: number;
  state_id: number;
  city_name: string;
}
export interface IRestaurant {
  restaurant_id: number;
  restaurant_name: string;
  address_id: number;
  mapped_user_id: number;
  city_name: string;
  city_id: number;
  state_name: string;
  state_id: number;
  address_line1: string | null;
}
@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {

  @Input() hasBeenClosed: boolean = false;
  @Input() isEditMode: Boolean = false;
  @Input() restaurantDetails?: any;
  @Output() onSave = new EventEmitter();

  isLoading: boolean = false;
  disabled: boolean = true;
  stateList: Array<Istates> = [];
  cityList: Array<Icities> = [];

  addEditRestaurantForm!: FormGroup;
  constructor(private apiservice: ApiService, private _fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllStates();
    this.initForm();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes?.['isEditMode']?.currentValue) {
        this.isEditMode = true;
        this.patchFormValue(changes?.['restaurantDetails']?.currentValue)
      }
      if (changes?.['hasBeenClosed']?.currentValue) {
        this.addEditRestaurantForm.reset()
        this.cityList = [];
      }
    }
  }
  get restaurantForm() { return this.addEditRestaurantForm.controls; }

  initForm() {
    this.addEditRestaurantForm = this._fb.group({
      restaurant_id: [''],
      state_id: [null, Validators.required],
      city_id: [null, Validators.required],
      restaurant_name: ['', Validators.required],
      address_line1: [''],
      address_id: ['']
    })
  }
  getAllStates() {
    let url = 'get-states';
    this.apiservice.getRequest(url).subscribe(res => {
      if (res.code == 201) {
        this.stateList = res.data;
      }
    }, (error) => {
      this.cityList = [];
      console.log(error);
    });
  }
  getCitiesList(): Promise<void> {
    const stateId = this.addEditRestaurantForm.value.state_id;
    const url = `get-cities/${stateId}`;
    return new Promise((resolve, reject) => {
      this.apiservice.getRequest(url).subscribe(
        (res) => {
          if (res.code == 201) {
            this.cityList = res.data;
          } else {
            this.cityList = res.data;
          }
          resolve(); // Resolve the promise once data is set
        },
        (error) => {
          this.cityList = [];
          console.log(error);
          reject(error); // Reject the promise on error
        }
      );
    });
  }
  addNewRestaurantDetails() {
    if (this.addEditRestaurantForm.invalid) {
      this.toastr.error('Please fill all the values');
      return;
    }
    const payLoad = {
      ...this.addEditRestaurantForm.value,
      mapped_user_id: 1 //this is user if of the role we have log in from.
    }
    if (!this.isEditMode) {
      // In case of add
      delete payLoad.restaurant_id;
      delete payLoad.address_id;
      let url = 'add-restaurant';
      this.apiservice.postRequest(url, payLoad).subscribe((res: any) => {
        if (res.code == 201) {
          this.toastr.success(`${res.data.message}`);
          this.onSave.emit(true);
        }
        else {
          this.toastr.error(`${res.data.message}`);
          // this.onSave.emit(false);
        }
      }, (error) => {
        console.log(error);
        // this.onSave.emit(false);
      })
    }
    // In case of edit
    else {
      delete payLoad.restaurant_id;
      payLoad.address_id = this.addEditRestaurantForm.value.address_id
      let url = `update-restaurant/${this.addEditRestaurantForm.value.restaurant_id}`;
      this.apiservice.putData(url, payLoad).subscribe((res: any) => {
        if (res.code == 201) {
          this.toastr.success('Details updated successfully');
          this.resetRestaurantForm()
        }
        else {
          this.toastr.error(`${res.data}`);
        }
      }, (error) => {
        console.log(error);
        // this.onSave.emit(false);
      });
    }
  }
  resetRestaurantForm() {
    this.addEditRestaurantForm.reset()
    this.cityList = [];
    this.onSave.emit(this.isEditMode);
  }
  async patchFormValue(param: IRestaurant) {
    this.addEditRestaurantForm.get('state_id')?.setValue(param.state_id);
    await this.getCitiesList(); // Wait for getCitiesList to complete
    this.addEditRestaurantForm.patchValue({
      restaurant_id: param.restaurant_id,
      state_id: param.state_id,
      city_id: param.city_id,
      restaurant_name: param.restaurant_name,
      address_line1: param.address_line1,
      address_id: param.address_id
    });
  }
}
