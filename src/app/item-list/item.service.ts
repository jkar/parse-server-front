import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [];

  constructor(private http: HttpClient) { }


  //όταν τραβάω 1η φορά τα items τα σώζω στο items, οπότε κάθε φορά που ζητούνται ξανά ,δεν γίνεται πάλι request στον server
  //,έρχονται απο το items, έτσι γίνονται λιγότερα requests στον server
  fetchItems() {

    if (this.items.length> 0) {
      console.log('cachedItems');
      return of(this.items);
    }
    console.log('retrieve items')
    return this.http.get<Item[]>(environment.itemsUrl)
      .pipe(tap(resData => {
        this.setItems(resData);
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
      );
  };

  setItems(resItems: Item[]) {
    this.items = resItems;
  };

  getItem(id: string) {
    const item = this.items.find(it => it.objectId === id);
    return {...item};
  };

  getItems() {
    return this.items.slice();
  };

}
