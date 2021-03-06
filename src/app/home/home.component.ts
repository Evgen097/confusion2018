import { Component, OnInit, Inject } from '@angular/core';

import {Dish} from "../shared/dish";
import {DishService} from "../services/dish.service";
import {Promotion} from "../shared/promotion";
import {PromotionService} from "../services/promotion.service";
import {LeaderService} from "../services/leader.service";
import {Leader} from "../shared/leader";
import {expand, flyInOut} from "../animations/app.animation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService,
              @Inject('BaseURL') private BaseURL
              ) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess.message);
    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.promoErrMess = <any>errmess.message);
    this.leaderService.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess.message);



    // this.dishService.getFeaturedDish()
    //   .subscribe(data => this.dish = data,
    //     errmess => this.dishErrMess = <any>errmess);
    //
    // this.promotionService.getFeaturedPromotion()
    //   .subscribe(data => this.promotion = data);
    //
    // this.leaderService.getFeaturedLeader()
    //   .subscribe(data => this.leader = data);
  }

}
