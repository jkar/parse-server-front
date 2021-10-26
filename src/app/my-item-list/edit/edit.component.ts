import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
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
    this.subscr = this.route.data.subscribe(data => {
      this.subsc2 = this.route.params.subscribe((params: Params) => {
        this.id = params['objectId'];
        this.editItem = data[0].find((it: Item) => it.objectId === this.id);
      });
    });

    this.initForm();
  }

  initForm() {
    this.itemForm = new FormGroup({
      name: new FormControl(this.editItem.name , [Validators.required, Validators.minLength(3)])
    });
  }

  onSubmit() {
    // console.log(this.itemForm.value);
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
