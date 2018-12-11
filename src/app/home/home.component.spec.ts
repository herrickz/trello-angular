import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { SimpleBoard } from '../models/simple-board';

describe('HomeComponent', () => {

  it('ngOnInit sets HomeComponent.boards returned from boardService.getBoards()', () => {

    const boards: SimpleBoard[] = [ { name: "board1", id: 5, hashId: "hash" } ];
    const boardServiceSpy = jasmine.createSpyObj('boardService', {
      getBoards: of(boards)
    });
    
    const homeComponent = new HomeComponent(boardServiceSpy, null);

    homeComponent.ngOnInit();

    expect(homeComponent.boards).toEqual(boards);

  });

  it('ngOnInit sets errorFetchingBoards to true when boardService.getBoards() returns error', () => {
    const boardServiceSpy = jasmine.createSpyObj('boardService', {
      getBoards: throwError("error")
    });
    
    const homeComponent = new HomeComponent(boardServiceSpy, null);

    homeComponent.ngOnInit();

    expect(homeComponent.errorFetchingBoards).toEqual(true);
  });

  it('goToBoard with abc123 calls router.navigate with abc123', () => {
    const mockRouter = jasmine.createSpyObj('router', ['navigate']);
    const homeComponent = new HomeComponent(null, mockRouter);

    homeComponent.goToBoard('abc123');

    expect(mockRouter.navigate).toHaveBeenCalledWith(['board', 'abc123']);
  });
});
