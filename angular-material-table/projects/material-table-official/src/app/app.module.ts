import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { TableBasicExample } from './01_table-basic-example/table-basic-example';
import { TableColumnStylingExample } from './02_table-column-styling-example/table-column-styling-example';
import { TableRowBindingExample } from './03_table-row-binding-example/table-row-binding-example';
import { TablePaginationExample } from './04_table-pagination-example/table-pagination-example';
import { TableSortingExample } from './05_table-sorting-example/table-sorting-example';
import { TableDynamicArrayDataExample } from './06_table-dynamic-array-data-example/table-dynamic-array-data-example';
import { TableDynamicColumnsExample } from './07_table-dynamic-columns-example/table-dynamic-columns-example';
import { TableDynamicObservableDataExample } from './08_table-dynamic-observable-data-example/table-dynamic-observable-data-example';
import { TableEditDataExample } from './09_table-edit-data-example/table-edit-data-example';
import { MyMaterialTable } from './my-material-table/my-material-table';
import { MyMaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,

    TableBasicExample,
    TableColumnStylingExample,    
    TableRowBindingExample,
    TablePaginationExample,
    TableSortingExample,
    TableDynamicArrayDataExample,
    TableDynamicColumnsExample,
    TableDynamicObservableDataExample,
    TableEditDataExample,
    MyMaterialTable 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    MyMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
