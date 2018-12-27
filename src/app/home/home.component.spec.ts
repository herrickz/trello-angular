import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { BoardService } from '../services/board.service';
import { MaterialModule } from '../material.module';
import { SimpleBoard } from '../models/simple-board';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { NavbarComponent } from '../navbar/navbar.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let getBoardsSpy;
  
  beforeEach(async(() => {
    const mockBoardService = jasmine.createSpyObj('BoardService', ['getBoards']);
    getBoardsSpy = mockBoardService.getBoards.and.returnValue(of([]));
    
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent,
        NavbarComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: [
          { provide: Router, useValue: { } },
          { provide: BoardService, useValue: mockBoardService },
          { provide: MatDialog, useValue: { } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading boards data... before boardService.getBoards returns', fakeAsync(() => {

    const nativeElement: HTMLElement = fixture.nativeElement;
    const mockBoards: SimpleBoard[] = [
        {
            id: 1,
            name: 'test board',
            hashId: 'abc123'
        }
    ]
    getBoardsSpy.and.returnValue(of(mockBoards).pipe(delay(1000)));
    fixture.detectChanges();

    expect(nativeElement.querySelector('#boardsLoadingCard').textContent.trim()).toEqual('Loading boards data...');

    tick(1000);

    fixture.detectChanges();
  }));

  it('should display There was an error fetching your boards after boardService.getBoards returns error', fakeAsync(() => {

    const nativeElement: HTMLElement = fixture.nativeElement;

    getBoardsSpy.and.returnValue(throwError(''));
    fixture.detectChanges();

    expect(nativeElement.querySelector('#boardsErrorCard').textContent.trim()).toEqual('There was an error fetching your boards');

  }));

});
