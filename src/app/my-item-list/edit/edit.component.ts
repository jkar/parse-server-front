import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { Item } from 'src/app/item-list/item.model';
import { MyItemService } from '../my-item.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  editItem: Item;
  id: string;
  subscr: Subscription;
  subsc2 : Subscription;
  itemForm: FormGroup;

  constructor(private route: ActivatedRoute, private myItemService: MyItemService) { }

  ngOnInit(): void {
    //1os τροπος

    //τραβάω τα data απο τον resolver που είναι τα fetched myItems, και μετά τραβάω το objectId απο τα params
    //για να βρω το συγκεκριμένο item που θέλω να κάνω edit

    this.subscr = this.route.data.subscribe(data => {
      this.subsc2 = this.route.params.subscribe((params: Params) => {
        this.id = params['objectId'];
        this.editItem = data[0].find((it: Item) => it.objectId === this.id);
      });
    });

    //2ος τρόπος

    //απο την εκτελεση του resolver εχω ήδη ενημερώσει το myItems οποτε μπορώ κατευθείαν απο τα params (objectId) να βρω το myItem που θέλω
      // this.subsc2 = this.route.params.subscribe((params: Params) => {
      //   this.id = params['objectId'];
      //   const myIt = this.myItemService.getMyItem(this.id);
      //   if (myIt) {
      //     this.editItem = myIt;
      //   }
      // });

    this.initForm();
  }

  initForm() {
    this.itemForm = new FormGroup({
      name: new FormControl(this.editItem.name , [Validators.required, Validators.minLength(3)])
    });
  }

  onSubmit() {
    this.myItemService.updateItem(this.id, this.itemForm.value)
      .subscribe(resData => {
        this.editItem = resData;
      },
      error => {
        console.log(error);
      }
      );

  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
    this.subsc2.unsubscribe();
  }

}
