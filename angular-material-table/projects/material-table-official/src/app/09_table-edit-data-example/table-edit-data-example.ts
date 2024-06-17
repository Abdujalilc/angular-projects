import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ELEMENT_DATA } from '../root/example-data';
import { PeriodicElement } from '../root/periodic-data-model';
import { MyMouseEvent} from './mouse-event-model';
import { selectedCellsStateModel } from './selected-cells-state';
@Component({
  selector: 'table-edit-data-example',
  templateUrl: 'table-edit-data-example.html',
  styleUrls: ['./table-edit-data-example.css']
})
export class TableEditDataExample {
  selectedCellsState: boolean[][]
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  tableMouseDown:   MyMouseEvent;
  tableMouseUp:     MyMouseEvent;
  FIRST_EDITABLE_ROW: number = 0;
  LAST_EDITABLE_ROW:  number = ELEMENT_DATA.length - 1; // = 9
  FIRST_EDITABLE_COL: number = 1;                       // first column pos is not editable --> so start from index 1
  LAST_EDITABLE_COL:  number = this.displayedColumns.length - 1; // = 3
  newCellValue:       string = ''; 

  constructor(public snackBar: MatSnackBar) {
    this.selectedCellsState=selectedCellsStateModel;
  }

  /**
   * Update table's dataSource
   * @param text
   */
  updateSelectedCellsValues(text: string) {

    if (text == null) { return; }

    if(this.tableMouseDown && this.tableMouseUp) {
      if(this.tableMouseDown.cellsType === this.tableMouseUp.cellsType) {

        const dataCopy: PeriodicElement[] = this.dataSource.slice(); // copy and mutate
        let startCol: number;
        let endCol:   number;
        let startRow: number;
        let endRow:   number;

        if(this.tableMouseDown.colId <= this.tableMouseUp.colId) {
          startCol = this.tableMouseDown.colId;
          endCol   = this.tableMouseUp.colId;
        } else {
          endCol   = this.tableMouseDown.colId;
          startCol = this.tableMouseUp.colId;
        }

        if(this.tableMouseDown.rowId <= this.tableMouseUp.rowId) {
          startRow = this.tableMouseDown.rowId;
          endRow   = this.tableMouseUp.rowId;
        } else {
          endRow   = this.tableMouseDown.rowId;
          startRow = this.tableMouseUp.rowId;
        }

        //--Edit cells from the same column
        if(startCol === endCol) {
          console.log('--Edit cells from the same column');
          for(let i = startRow; i <= endRow; i++) {
            dataCopy[i][this.displayedColumns[startCol]] = text;
          }
        } else {
          //--Edit cells starting and ending not on the same column
          console.log('--Edit cells starting and ending not on the same column');

          for(let i = startRow; i <= endRow; i++) {
            for(let j = startCol; j <= endCol; j++) {
              dataCopy[i][this.displayedColumns[j]] = text;
            }
          }
        }
        console.log('--update: ' + startRow + ', '+ startCol + ' to ' + endRow + ', '+ endCol);
        this.dataSource = dataCopy;

      } else {
        this.openSnackBar('The selected cells don\'t have the same type.', 'OK');
      }
    }
  }
  onMouseDown(rowId: number, colId: number, cellsType: string) {

    this.tableMouseDown = {rowId: rowId, colId: colId, cellsType: cellsType};
  }

  onMouseUp(rowId: number, colId: number, cellsType: string) {

    this.tableMouseUp = {rowId: rowId, colId: colId, cellsType: cellsType};
    if(this.tableMouseDown) {
      this.newCellValue = '';
      this.updateSelectedCellsState(this.tableMouseDown.colId, this.tableMouseUp.colId, this.tableMouseDown.rowId, this.tableMouseUp.rowId);
    }
  }

  private updateSelectedCellsState(mouseDownColId: number, mouseUpColId: number, mouseDownRowId: number, mouseUpRowId: number) {

    // init selected cells
    for (let i = this.FIRST_EDITABLE_ROW; i <= this.LAST_EDITABLE_ROW; i++) {
      for (let j = this.FIRST_EDITABLE_COL; j <= this.LAST_EDITABLE_COL; j++) {
        this.selectedCellsState[i][j] = false;
      }
    }
    // update selected cells
    let startCol: number;
    let endCol:   number;
    let startRow: number;
    let endRow:   number;
    if (mouseDownColId <= mouseUpColId) {
      startCol = mouseDownColId;
      endCol   = mouseUpColId;
    } else {
      endCol   = mouseDownColId;
      startCol = mouseUpColId;
    }

    if (mouseDownRowId <= mouseUpRowId) {
      startRow = mouseDownRowId;
      endRow   = mouseUpRowId;
    } else {
      endRow   = mouseDownRowId;
      startRow = mouseUpRowId;
    }
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        this.selectedCellsState[i][j] = true;
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {

    // If no cell is selected then ignore keyUp event
    if(this.tableMouseDown && this.tableMouseUp) {

      let specialKeys: string[] = ['Enter', 'PrintScreen', 'Escape', 'cControl', 'NumLock', 'PageUp', 'PageDown', 'End',
        'Home', 'Delete', 'Insert', 'ContextMenu', 'Control', 'ControlAltGraph', 'Alt', 'Meta', 'Shift', 'CapsLock',
        'TabTab', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Pause', 'ScrollLock', 'Dead', '',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];

      if(event.key === 'Backspace') { // 'delete' key is pressed
        const end: number = this.newCellValue.length - 1;
        this.newCellValue = this.newCellValue.slice(0, end);

      } else if(this.indexOfInArray(event.key, specialKeys) === -1) {
        this.newCellValue += event.key;
      }
      this.updateSelectedCellsValues(this.newCellValue);
    }
  }

  indexOfInArray(item: string, array: string[]): number {
    let index: number = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === item) { index = i; }
    }
    return index;
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 4000 });
  }
}
