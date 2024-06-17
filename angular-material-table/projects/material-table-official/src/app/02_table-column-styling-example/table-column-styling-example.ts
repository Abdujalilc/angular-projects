import {Component} from '@angular/core';
import { ELEMENT_DATA } from '../root/example-data';

@Component({
  selector: 'table-column-styling-example',
  styleUrls: ['table-column-styling-example.css'],
  templateUrl: 'table-column-styling-example.html',
})
export class TableColumnStylingExample {
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  dataSource = ELEMENT_DATA;
}
