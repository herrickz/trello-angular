import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModalComponent } from './card-modal.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CardService } from '../services/card.service';
import { DomSanitizer } from '@angular/platform-browser';

describe('CardModalComponent', () => {
  let component: CardModalComponent;
  let fixture: ComponentFixture<CardModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardModalComponent ],
      imports: [ MaterialModule, FormsModule ],
      providers: [ 
        { provide: MatDialogRef, useValue: null },
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: CardService, useValue: null },
        { provide: DomSanitizer, useValue: null }

      ]
    })
    .compileComponents();
  }));

});
