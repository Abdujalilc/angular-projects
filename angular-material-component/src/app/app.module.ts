import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyMaterialModule } from './material.module';
import { AutocompleteOverviewExample } from './components/01_autocomplete/autocomplete-overview-example';
import { BadgeOverviewExample } from './components/02_badge/badge-overview-example';
import { BottomSheetOverviewExample, BottomSheetOverviewExampleSheet } from './components/03_bottom-sheet/bottom-sheet-overview-example';
import { ButtonOverviewExample } from './components/04_button/button-overview-example';
import { ButtonToggleModeExample } from './components/05_button-toggle/button-toggle-mode-example';
import { CardMediaSizeExample } from './components/06_card/card-media-size-example';
import { CheckboxOverviewExample } from './components/07_checkbox/checkbox-overview-example';
import { ChipsOverviewExample } from './components/08_chips/chips-overview-example';
import { DatepickerOverviewExample } from './components/09_date-picker/datepicker-overview-example';
import { DialogOverviewExample, DialogOverviewExampleDialog } from './components/10_dialog/dialog-overview-example';
import { DividerOverviewExample } from './components/11_devider/divider-overview-example';
import { ExpansionOverviewExample } from './components/12_expansion-panel/expansion-overview-example';
import { FormFieldOverviewExample } from './components/13_form-field/form-field-overview-example';
import { GridListOverviewExample } from './components/14_grid-list/grid-list-overview-example';
import { IconOverviewExample } from './components/15_Icons/icon-overview-example';
import { InputOverviewExample } from './components/16_Input/input-overview-example';
import { ListOverviewExample } from './components/17_list/list-overview-example';
import { MenuOverviewExample } from './components/18_menu/menu-overview-example';
import { PaginatorOverviewExample } from './components/19_paginator/paginator-overview-example';
import { ProgressBarBufferExample } from './components/20_progress-bar/progress-bar-buffer-example';
import { ProgressSpinnerOverviewExample } from './components/21_progress-spinner/progress-spinner-overview-example';
import { RadioOverviewExample } from './components/22_radio-button/radio-overview-example';
import { RippleOverviewExample } from './components/23_ripples/ripple-overview-example';
import { SelectOverviewExample } from './components/24_select/select-overview-example';
import { SidenavDrawerOverviewExample } from './components/25_sidenav/sidenav-drawer-overview-example';
import { SlideToggleOverviewExample } from './components/26_slide-toggle/slide-toggle-overview-example';
import { SliderOverviewExample } from './components/27_slider/slider-overview-example';
import { SnackBarOverviewExample } from './components/28_snack-bar/snack-bar-overview-example';
import { SortOverviewExample } from './components/29_sort-header/sort-overview-example';
import { StepperOverviewExample } from './components/30_stepper/stepper-overview-example';
import { TabGroupAlignExample } from './components/31_tab-group-align-example/tab-group-align-example';
import { ToolbarOverviewExample } from './components/32_toolbar-overview-example/toolbar-overview-example';
import { TooltipOverviewExample } from './components/33_tooltip-overview-example/tooltip-overview-example';
import { TreeNestedOverviewExample } from './components/34_tree-nested-overview-example/tree-nested-overview-example';
@NgModule({
  declarations: [AppComponent,AutocompleteOverviewExample,BadgeOverviewExample,BottomSheetOverviewExample,
    BottomSheetOverviewExampleSheet,ButtonOverviewExample,ButtonToggleModeExample,CardMediaSizeExample,CheckboxOverviewExample,
    ChipsOverviewExample,DatepickerOverviewExample,DialogOverviewExample,DialogOverviewExampleDialog,
    DividerOverviewExample,ExpansionOverviewExample,FormFieldOverviewExample,GridListOverviewExample,
    IconOverviewExample,InputOverviewExample,ListOverviewExample,MenuOverviewExample,
    PaginatorOverviewExample,ProgressBarBufferExample,ProgressSpinnerOverviewExample,
    RadioOverviewExample,RippleOverviewExample,SelectOverviewExample,SidenavDrawerOverviewExample,
    SlideToggleOverviewExample,SliderOverviewExample,SnackBarOverviewExample,SortOverviewExample,
    StepperOverviewExample, TabGroupAlignExample,ToolbarOverviewExample,TooltipOverviewExample,
    TreeNestedOverviewExample,
    
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, MyMaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
