import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Item } from 'src/app/item-list/item.model';
import { ItemService } from 'src/app/item-list/item.service';
import { MyItemService } from '../my-item.service';

@Injectable({
  providedIn: 'root'
})

//τσεκάρω αρχικά αν τα items kai myItems είναι γεμάτα και επίσης αν το objectId του route (url, route.paramMap.get('objectId')) είναι μέσα στα myItems,
//αν είναι γυρνάει όλο το myItems
//Αλλιώς
//Τραβάω και όλα τα items και τα αποθηκέυω στο this.itemService.items και τα items με βάση το userId (απο το url ,route.paramMap.get('userId')) και τ αποθηκεύω στο this.myItemService.myItems
export class EditResolver implements Resolve<Item[]> {

  constructor(private itemService: ItemService, private myItemService: MyItemService, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.myItemService.myItems.length !== 0) {
      const item = this.myItemService.getMyItems().find(it => it.objectId === route.paramMap.get('objectId'));
      if (this.itemService.items.length === 0) {
        this.itemService.fetchItems().subscribe();
      }
      if (item) {
        console.log('cacheResolveMyItem');
        return of(this.myItemService.getMyItems());
      }
    }

    console.log('resolveAll');
    this.itemService.fetchItems().subscribe();
    return this.myItemService.fetchMyItems(route.paramMap.get('userId'));

    };

}
