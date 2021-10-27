import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Item } from '../item-list/item.model';
import { ItemService } from '../item-list/item.service';

@Injectable({
  providedIn: 'root'
})
export class MyItemService {
  myItems: Item[] = [];

  constructor(private http: HttpClient, private itemService: ItemService) { }

    //όταν τραβάω 1η φορά τα items τα σώζω στο myItems, οπότε κάθε φορά που ζητούνται ξανά ,δεν γίνεται πάλι request στον server
  //,έρχονται απο το myItems, έτσι γίνονται λιγότερα requests στον server
  fetchMyItems(objId: string | null | undefined) {
    if (this.myItems.length > 0) {
      console.log('cachedMyItems');
      return of(this.myItems);
    }

    return this.http.get<Item[]>(environment.itemsUrl + '/' + objId)
      .pipe(tap((resData: Item[]) => {
        this.setMyItems(resData);
      }),
      catchError(error => {
        return throwError(error);
      })
      );
  };

  setMyItems(res: Item[]) {
    this.myItems = res;
  };

  getMyItems() {
    return this.myItems.slice();
  };

  getMyItem(id: string): Item | null {
    const item = this.myItems.find(it => it.objectId === id);
    if (item) {
      return {...item};

    }
    return null;
  };

  updateItem(id: string, body: { name: string }) {
    return this.http.put<Item>(environment.itemsUrl + '/' + id , body)
      .pipe(
        tap(resData => {
          const index = this.myItems.findIndex((it: Item) => it.objectId === id);
          this.myItems[index] = resData;

          const index2 = this.itemService.getItems().findIndex((it: Item) => it.objectId === id);
          this.itemService.items[index2] = resData;

          console.log('ITEMS', this.itemService.getItems());
          console.log('MYITEMS',  this.getMyItems());
        },
        catchError(error => {
          return throwError(error);
        })
        )
      );
  }

  deleteItem(id: string) {
    return this.http.delete(environment.itemsUrl + '/' + id)
      .pipe(
        tap(resData => {
          const indexMyItems = this.myItems.findIndex((it: Item) => it.objectId === id);
          this.myItems.splice(indexMyItems, 1);

          const indexItems = this.itemService.items.findIndex((it: Item) => it.objectId === id);
          this.itemService.items.splice(indexItems, 1);

          console.log('ITEMS', this.itemService.getItems());
          console.log('MYITEMS',  this.getMyItems());
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
