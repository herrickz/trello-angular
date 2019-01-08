import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { MaterialModule } from './material.module';
import { CreateBoardDialogComponent } from './create-board-dialog/create-board-dialog.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListComponent } from './list/list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CardModalComponent } from './card-modal/card-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    CreateBoardDialogComponent,
    ListComponent,
    NavbarComponent,
    CardModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
   { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  entryComponents: [ 
    CreateBoardDialogComponent,
    CardModalComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
