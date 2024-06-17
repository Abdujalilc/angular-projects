import {Component} from '@angular/core';
import { ELEMENT_DATA } from '../root/example-data';
import { PeriodicElement } from '../root/periodic-data-model';

@Component({
  selector: 'table-row-binding-example',
  styleUrls: ['table-row-binding-example.css'],
  templateUrl: 'table-row-binding-example.html',
})
export class TableRowBindingExample {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
}
