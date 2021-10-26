import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class ItemResolver implements Resolve<Item[]> {

  constructor(private itemService: ItemService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.itemService.items.length !== 0) {
      console.log('cacheResolve');
      return of(this.itemService.getItems());
    }
    console.log('resolve');
      return this.itemService.fetchItems();
  }
}
