import { Injectable } from '@angular/core';
import {Promotion} from "../shared/promotion";
import {PROMOTIONS} from "../shared/promotions";
import {DISHES} from "../shared/dishes";

import { Observable } from 'rxjs';
import {of} from "rxjs/index";
import {delay} from "rxjs/operators";
import {LEADERS} from "../shared/leaders";


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable <Promotion[]>{
    return of(PROMOTIONS).pipe(delay(500));

  }

  getPromotion(id: number): Observable <Promotion>{
    return of(PROMOTIONS.filter( promo => promo.id == id )[0]).pipe(delay(500));
  }

  getFeaturedPromotion(): Observable <Promotion>{
    return of(PROMOTIONS.filter( promo => promo.featured )[0]).pipe(delay(500));

  }


}
