import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api/api.flowchart_service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.scss'
})
export class RestaurantDetailComponent {
  restaurantId!: number;
  restaurantDetails!: any;
  imageList = [
    {
      url: '../../assets/burger.jpg',
      foodName: 'Burger',
      cost: 20
    },
    {
      url: '../../assets/pizza.jpg',
      foodName: 'Pizza',
      cost: 100
    },
  ]
  constructor(private route: ActivatedRoute, private apiservice: ApiService) { }

  ngOnInit() {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.getRestaurant();
  }
  getRestaurant() {
    let url = 'get-restaurant/' + this.restaurantId;
    this.apiservice.getRequest(url).subscribe(res => {
      if (res.code == 201) {
        this.restaurantDetails = res.data;
      }
      else {
        this.restaurantDetails  = {};
      }
    }, (error) => {

    });
  }
}
