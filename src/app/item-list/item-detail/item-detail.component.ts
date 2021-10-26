import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  id: string;
  item: Item;
  subs1: Subscription;
  subs2: Subscription;

  constructor(private route: ActivatedRoute) { }


  //Για να μειώσω τα requests στον server , χρησιμοποιώ resolver στον οποίο τσεκάρω πρώτα αν τα items έχουν έρθει ήδη για να μην τα ξανατραβήξω
  //αλλιώς αν δεν έχουν έρθει, τότε τα τραβάω και τα αποθηκέυω στο ItemService για να μην γίνει άλλο request για αυτά.
  ngOnInit(): void {
        //ta data einai apo ton resolver pou prwta fernei ta data k meta ginetai to temlapte(html)
        this.subs1 = this.route.data.subscribe(data => {
          this.subs2 = this.route.params
          .subscribe(
            (params: Params) => {
              this.id = params['id'];
              const i = data[0].filter((it: Item) => it.objectId === this.id);
              this.item = i[0];
            }
          );
        });
  };

  ngOnDestroy() {
    this.subs1.unsubscribe();
    this.subs2.unsubscribe();
  };

}
