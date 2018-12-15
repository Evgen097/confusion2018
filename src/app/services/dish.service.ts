import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
// import {DISHES} from '../shared/dishes';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService,
              private restangular: Restangular) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
    // return this.http.get<Dish[]>(baseURL + 'dishes')
    //   .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return  this.restangular.one('dishes', id).get();
    // return this.http.get<Dish>(baseURL + 'dishes/' + id)
    //   .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
      .pipe(map(dishes => dishes[0]));
    // return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
    //   .pipe(map(dishes => dishes[0]))
    //   .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)),
        catchError(error => error ));
    // return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    //   .pipe(catchError(error => error));
  }

}






















