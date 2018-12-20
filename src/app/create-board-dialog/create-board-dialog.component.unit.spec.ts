import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoardDialogComponent } from './create-board-dialog.component';
import { Board } from '../models/board';
import { of } from 'rxjs';

describe('CreateBoardDialogComponent Unit', () => {
  
  let mockDialogReference;
  let mockBoardService;
  let createBoardDialogComponent: CreateBoardDialogComponent;

  beforeEach(() => {
    mockDialogReference = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockBoardService = jasmine.createSpyObj('BoardService', ['createBoard']);

    createBoardDialogComponent = new CreateBoardDialogComponent(mockDialogReference, mockBoardService);
  });

  it('onCancel should call dialogReference.close With didCreateBoard false', () => {
    
    createBoardDialogComponent.onCancel();

    expect(mockDialogReference.close).toHaveBeenCalledWith({ didCreateBoard: false });
  });

  it('onCreateBoard should call boardService.createBoard with "test board" when boardName is "test board"', () => {

    createBoardDialogComponent.boardName = 'test board'; 

    const testBoard: Board = {
      id: 1,
      name: 'test board',
      hashId: 'hash'
    }
    mockBoardService.createBoard.and.returnValue(of(testBoard));

    createBoardDialogComponent.onCreateBoard();

    expect(mockBoardService.createBoard).toHaveBeenCalledWith('test board');
  });

  it('onCreateBoard should calls dialogReference.close with didCreateBoard true and board returned from boardService.createBoard', () => {
    
    const testBoard: Board = {
      id: 1,
      name: 'test board',
      hashId: 'hash'
    }
    mockBoardService.createBoard.and.returnValue(of(testBoard));

    createBoardDialogComponent.onCreateBoard();

    expect(mockDialogReference.close).toHaveBeenCalledWith({ didCreateBoard: true, board: testBoard });
  });

  it('canAddBoard returns false when boardName is empty string', () => {

    createBoardDialogComponent.boardName = '';

    expect(createBoardDialogComponent.canAddBoard()).toEqual(false);
  });

  it('canAddBoard returns true when boardName is not empty string', () => {

    createBoardDialogComponent.boardName = 'I\'m not empty';

    expect(createBoardDialogComponent.canAddBoard()).toEqual(true);
  });
});
