import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MyMaterialModule } from './material-module';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,    
    MyMaterialModule,
  ],
  declarations: [AppComponent, ConfirmDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
