import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/item-list/item.model';
import { MyItemService } from '../my-item.service';

@Component({
  selector: 'app-my-item',
  templateUrl: './my-item.component.html',
  styleUrls: ['./my-item.component.css']
})
export class MyItemComponent implements OnInit {
  @Input() item: Item;


  constructor(private myItemService: MyItemService) { }

  ngOnInit(): void {
  };

  deleteItem(id: string) {
    this.myItemService.deleteItem(this.item.objectId)
      .subscribe(() => {},
      error => {
        console.log(error);
      });
  };
}
