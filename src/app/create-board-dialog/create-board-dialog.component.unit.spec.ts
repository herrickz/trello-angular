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

  describe('onCancel', () => {
    it('should call dialogReference.close With didCreateBoard false', () => {
    
      createBoardDialogComponent.onCancel();
  
      expect(mockDialogReference.close).toHaveBeenCalledWith({ didCreateBoard: false });
    });
  });

  describe('onCreateBoard', () => {

    it('should call boardService.createBoard with "test board" when boardName is "test board"', () => {

      createBoardDialogComponent.boardName = 'test board'; 
  
      const testBoard: Board = {
        id: 1,
        name: 'test board',
        hashId: 'hash',
        lists: []
      }
      mockBoardService.createBoard.and.returnValue(of(testBoard));
  
      createBoardDialogComponent.onCreateBoard();
  
      expect(mockBoardService.createBoard).toHaveBeenCalledWith('test board');
    });
  
    it('should calls dialogReference.close with didCreateBoard true and board returned from boardService.createBoard', () => {
      
      const testBoard: Board = {
        id: 1,
        name: 'test board',
        hashId: 'hash',
        lists: []
      }
      mockBoardService.createBoard.and.returnValue(of(testBoard));
  
      createBoardDialogComponent.onCreateBoard();
  
      expect(mockDialogReference.close).toHaveBeenCalledWith({ didCreateBoard: true, board: testBoard });
    });
  
  });

  describe('canAddBoard', () => {
    it('returns false when boardName is empty string', () => {

      createBoardDialogComponent.boardName = '';
  
      expect(createBoardDialogComponent.canAddBoard()).toEqual(false);
    });
  
    it('returns true when boardName is not empty string', () => {
  
      createBoardDialogComponent.boardName = 'I\'m not empty';
  
      expect(createBoardDialogComponent.canAddBoard()).toEqual(true);
    });
  });
});
