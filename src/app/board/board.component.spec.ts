import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { Board } from '../models/board';
import { of, throwError } from 'rxjs';
import { BoardService } from '../services/board.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { delay } from 'rxjs/operators';
import { MaterialModule } from '../material.module';
import { CardService } from '../services/card.service';
import { FormsModule } from '@angular/forms';
import { ListService } from '../services/list.service';
import { CreateCardComponent } from '../create-card/create-card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ListComponent } from '../list/list.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  let getBoardSpy;
  let mockListService;
  let mockCardService;
  
  beforeEach(async(() => {
    const mockBoardService = jasmine.createSpyObj('BoardService', ['getBoard']);
    const mockListService = jasmine.createSpyObj('ListService', ['createList']);
    const mockCardService = jasmine.createSpyObj('CardService', ['updateCardOrder']);

    const testBoard: Board = {
      id: 1,
      name: 'test board',
      hashId: 'aaa',
      lists: []
    }
    getBoardSpy = mockBoardService.getBoard.and.returnValue(of(testBoard));
  
    const mockActivatedRoute = {
        snapshot: { 
            params: {
                hashId: 'abc123'
            }
        }
    }
    
    TestBed.configureTestingModule({
      declarations: [ 
        BoardComponent, 
        CreateCardComponent,
        NavbarComponent,
        ListComponent
      ],
      imports: [
        MaterialModule,
        FormsModule
      ],
      providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: BoardService, useValue: mockBoardService },
          { provide: ListService, useValue: mockListService },
          { provide: CardService, useValue: mockCardService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading board data... before boardService.getBoard returns', fakeAsync(() => {

    const nativeElement: HTMLElement = fixture.nativeElement;
    const testBoard: Board = {
      id: 1,
      name: 'the coolest board',
      hashId: 'abc123',
      lists: []
    };

    getBoardSpy.and.returnValue(of(testBoard).pipe(delay(1000)));
    fixture.detectChanges();

    expect(nativeElement.querySelector('#boardLoadingCard').textContent.trim()).toEqual('Loading board data...');
    
    tick(1000);

    fixture.detectChanges();

    expect(nativeElement.querySelector('#boardName').textContent.trim()).toEqual('the coolest board');
  }));

  it('should display There was an error loading this board after boardService.getBoard returns with error', fakeAsync(() => {

    const nativeElement: HTMLElement = fixture.nativeElement;

    getBoardSpy.and.returnValue(throwError('Error').pipe(delay(1000)));
    fixture.detectChanges();

    expect(nativeElement.querySelector('#boardLoadErrorCard').textContent.trim()).toEqual('There was an error loading this board');

    tick(1000);

    fixture.detectChanges();
  }));

});
