import { Injectable } from '@angular/core';
import {Leader} from "../shared/leader";
import {LEADERS} from "../shared/leaders";

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {DISHES} from "../shared/dishes";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable <Leader[]>{
    return of(LEADERS).pipe(delay(500));
  }

  getLeader(id: number):  Observable <Leader>{
    return of(LEADERS.find( promo => promo.id == id )).pipe(delay(500));
  }

  getFeaturedLeader():  Observable <Leader>{
    return of(LEADERS.find( promo => promo.featured )).pipe(delay(500));
  }
}
