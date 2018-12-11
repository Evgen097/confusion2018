import { Injectable } from '@angular/core';
import {Leader} from "../shared/leader";
import {LEADERS} from "../shared/leaders";


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[]{
    return LEADERS;
  }
  getLeader(id: number): Leader{
    return LEADERS.find( promo => promo.id == id );
  }
  getFeaturedLeader(): Leader{
    return LEADERS.find( promo => promo.featured );
  }

}
