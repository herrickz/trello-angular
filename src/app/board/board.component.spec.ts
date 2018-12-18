import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { Board } from '../models/board';
import { of, throwError } from 'rxjs';
import { BoardService } from '../services/board.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { delay } from 'rxjs/operators';
import { MaterialModule } from '../material.module';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  let getBoardSpy;
  
  beforeEach(async(() => {
    const mockBoardService = jasmine.createSpyObj('BoardService', ['getBoard']);
    const testBoard: Board = {
        name: 'test board'
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
      declarations: [ BoardComponent ],
      imports: [
        MaterialModule
      ],
      providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: BoardService, useValue: mockBoardService }
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

    getBoardSpy.and.returnValue(of({name: 'the coolest board'}).pipe(delay(1000)));
    fixture.detectChanges();

    expect(nativeElement.querySelector('#boardLoadingCard').textContent.trim()).toEqual('Loading board data...');
    
    tick(1000);

    fixture.detectChanges();

    expect(nativeElement.querySelector('h2').textContent.trim()).toEqual('the coolest board');
  }));

  it('should display There was an error loading this board after boardService.getBoard returns with error', fakeAsync(() => {

    const nativeElement: HTMLElement = fixture.nativeElement;

    getBoardSpy.and.returnValue(throwError('Error').pipe(delay(1000)));
    fixture.detectChanges();

    expect(nativeElement.querySelector('#boardLoadErrorCard').textContent.trim()).toEqual('There was an error loading this board');

  }));

});
