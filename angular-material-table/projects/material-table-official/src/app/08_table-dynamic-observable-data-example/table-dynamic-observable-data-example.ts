import {Component} from '@angular/core';
import { ELEMENT_DATA } from '../root/example-data';
import { ExampleDataSource } from '../root/example-data-source';

@Component({
  selector: 'table-dynamic-observable-data-example',
  styleUrls: ['table-dynamic-observable-data-example.css'],
  templateUrl: 'table-dynamic-observable-data-example.html',
})
export class TableDynamicObservableDataExample {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }
}


