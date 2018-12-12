import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

describe('BoardComponent Unit', () => {

  it('ngOnInit should call boardService with abc123 when activatedRoute.snapshot.params.hashId is abc123', () => {

    const mockActivatedRoute = new ActivatedRoute();
    const mockActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    mockActivatedRouteSnapshot.params = {
      boardId: 'abc123'
    }
    mockActivatedRoute.snapshot = mockActivatedRouteSnapshot;

    const mockBoardService = jasmine.createSpyObj('boardService', ['getBoard']);

    const boardComponent = new BoardComponent(mockActivatedRoute, mockBoardService);

    boardComponent.ngOnInit();

    expect(mockBoardService.getBoard).toHaveBeenCalledWith('abc123');
  });

  
});
