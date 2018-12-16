import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SimpleBoard } from '../models/simple-board';

describe('BoardComponent Unit', () => {

  it('ngOnInit should call boardService with abc123 when activatedRoute.snapshot.params.hashId is abc123', () => {

    const mockActivatedRoute = new ActivatedRoute();
    const mockActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    mockActivatedRouteSnapshot.params = {
      boardId: 'abc123'
    }
    mockActivatedRoute.snapshot = mockActivatedRouteSnapshot;

    const mockBoardService = jasmine.createSpyObj('boardService', ['getBoard']);
    const testBoard: SimpleBoard = {
      name: 'test board',
      hashId: 'abc123',
      id: 1
    }
    mockBoardService.getBoard.and.returnValue(of(testBoard));

    const boardComponent = new BoardComponent(mockActivatedRoute, mockBoardService);

    boardComponent.ngOnInit();

    expect(mockBoardService.getBoard).toHaveBeenCalledWith('abc123');
  });

  it('ngOnInit should set boardLoadError to true when boardService returns error', () => {

    const mockActivatedRoute = new ActivatedRoute();
    const mockActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    mockActivatedRouteSnapshot.params = {
      boardId: 'abc123'
    }
    mockActivatedRoute.snapshot = mockActivatedRouteSnapshot;

    const mockBoardService = jasmine.createSpyObj('boardService', ['getBoard']);
    mockBoardService.getBoard.and.returnValue(throwError('Some error'));

    const boardComponent = new BoardComponent(mockActivatedRoute, mockBoardService);

    boardComponent.ngOnInit();

    expect(boardComponent.boardLoadError).toEqual(true)
  });
  
});
