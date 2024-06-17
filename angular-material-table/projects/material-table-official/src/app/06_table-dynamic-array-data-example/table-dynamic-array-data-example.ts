import {Component, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import { ELEMENT_DATA } from '../root/example-data';
import { PeriodicElement } from '../root/periodic-data-model';

@Component({
  selector: 'table-dynamic-array-data-example',
  styleUrls: ['table-dynamic-array-data-example.css'],
  templateUrl: 'table-dynamic-array-data-example.html',
})
export class TableDynamicArrayDataExample {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
}
