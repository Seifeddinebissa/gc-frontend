import { Dommage } from '../../type-dommage/dommage';
import { DommageItem } from '../dommage-item';
import { DommageItemService } from './../dommage-item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-show-dommage-item',
  templateUrl: './show-dommage-item.component.html',
  styleUrls: ['./show-dommage-item.component.scss']
})
export class ShowDommageItemComponent implements OnInit {

  dommageItem: DommageItem;
  dommage: Dommage;

  constructor(
    private dommageItemService: DommageItemService
  ) { }

  async ngOnInit() {
    this.dommageItem = new DommageItem();
    this.dommage = new Dommage();
    let id = localStorage.getItem('id');
    this.dommageItem = await this.dommageItemService.getDommageItemById(+id);
    this.dommage = this.dommageItem.dommage;
  }

}
