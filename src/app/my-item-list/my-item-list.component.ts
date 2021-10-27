import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Item } from '../item-list/item.model';
import { MyItemService } from './my-item.service';

@Component({
  selector: 'app-my-item-list',
  templateUrl: './my-item-list.component.html',
  styleUrls: ['./my-item-list.component.css']
})
export class MyItemListComponent implements OnInit, OnDestroy {
  myItems: Item[];
  user: User | null = null;
  UserSubscr: Subscription;
  subscr: Subscription;

  constructor(private myItemsService: MyItemService, private authService: AuthService) { }

  //Θα μπορούσα να μην τραβάω ξανά τα items (με βάση 'ομως το ObjectId) και να τα κάνω filtering locally με this.ItemService.items.filter(it => it.userId === this.user.id);
  //το κάνω απλά για να χρησιμοποιήσω και το endpoint που κάνει filtering με βάση το objectId.
  //θα πρέπει όμως όταν κάνω update , insert, delete να ενημερώνω τοπικά και το this.ItemService.items πέρα απο το this.myItemsService.myItems.
  ngOnInit(): void {
    this.UserSubscr = this.authService.user.subscribe(user => {
      this.user = user;
      if (this.user?.id) {
        this.subscr = this.myItemsService.fetchMyItems(this.user?.id)
          .subscribe(myItems => {
            console.log('It', myItems);
            this.myItems = myItems;
          });
      }
    },
    error => {
      console.log(error);
    }
    );
  };

  ngOnDestroy() {
    this.UserSubscr.unsubscribe();
    this.subscr.unsubscribe();
  }

}
