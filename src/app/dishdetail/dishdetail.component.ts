import { Component, OnInit, Input, Inject } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {Dish} from "../shared/dish";
import {DishService} from "../services/dish.service";
import { switchMap } from 'rxjs/operators';

import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;
  visibility = 'shown';
  dishcopy: Dish;

  constructor(private dishService: DishService, private location: Location,
              private route: ActivatedRoute, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    // this.dishService.getDishIds()
    //   .subscribe( dishIds => this.dishIds = dishIds );

    // this.route.params
    //   .switchMap((params: Params) =>{this.dishService.getDish(+params['id'])
    //   .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id);});
    //
    // });

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    // this.route.params.pipe(switchMap((params: Params) =>
    //   this.dishService.getDish(+params['id'])))
    //     .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id)},
    //         errmess => this.errMess = <any>errmess);

    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.dishService.getDish(+params['id']);
    }))
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
      },
        errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }


  goBack(): void {
    this.location.back();
  }

}
