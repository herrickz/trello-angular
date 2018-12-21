import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { SimpleBoard } from '../models/simple-board';
import { BoardComponent } from '../board/board.component';
import { CreateBoardDialogComponent } from '../create-board-dialog/create-board-dialog.component';
import { Board } from '../models/board';

describe('HomeComponent Unit', () => {

  let mockBoardService;
  let mockRouter;
  let mockDialog;

  let homeComponent: HomeComponent;

  beforeEach(() => {
    mockBoardService = jasmine.createSpyObj('BoardService', ['getBoards']);
    mockRouter = jasmine.createSpyObj('router', ['navigate']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    homeComponent = new HomeComponent(mockBoardService, mockRouter, mockDialog);
  });

  describe('ngOnInit', () => {
    it('sets boards to boards returned from boardService.getBoards()', () => {

      const boards: SimpleBoard[] = [ { name: "board1", id: 5, hashId: "hash" } ];
      
      mockBoardService.getBoards.and.returnValue(of(boards));
      
      homeComponent.ngOnInit();
  
      expect(homeComponent.boards).toEqual(boards);
  
    });
  
    it('sets errorFetchingBoards to true when boardService.getBoards() returns error', () => {
  
      mockBoardService.getBoards.and.returnValue(throwError('error'));
      
      homeComponent.ngOnInit();
  
      expect(homeComponent.errorFetchingBoards).toEqual(true);
    });
  });

  describe('goToBoard', () => {
    it('with abc123 calls router.navigate with abc123', () => {

      homeComponent.goToBoard('abc123');
  
      expect(mockRouter.navigate).toHaveBeenCalledWith(['board', 'abc123']);
    });
  });

  describe('createBoard', () => {
  
    it('should call dialog.open with CreateBoardDialogComponent', () => {

      const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      mockDialogRef.afterClosed.and.returnValue(of(undefined));
      
      mockDialog.open.and.returnValue(mockDialogRef);
  
      homeComponent.createBoard();
  
      expect(mockDialog.open).toHaveBeenCalledWith(CreateBoardDialogComponent);
    });
  
    it('should do nothing when dialogRef.afterClosed returns undefined result', () => {
  
      const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      mockDialogRef.afterClosed.and.returnValue(of(undefined));
      
      mockDialog.open.and.returnValue(mockDialogRef);
  
      homeComponent.createBoard();
    });
  
    it('should do nothing when dialogRef.afterClosed returns didCreateBoard false result', () => {
  
      const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      mockDialogRef.afterClosed.and.returnValue(of({ didCreateBoard: false }));
      
      mockDialog.open.and.returnValue(mockDialogRef);
  
      homeComponent.createBoard();
    });
  
    it('should call router.navigate with ["board", "testhash"] when dialogRef.afterClosed returns didCreateBoard true and board result', () => {
  
      const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      const board: Board = {
        id: 1,
        name: 'returned board',
        hashId: 'testhash',
        lists: []
      }
      mockDialogRef.afterClosed.and.returnValue(of({ didCreateBoard: true, board: board }));
      
      mockDialog.open.and.returnValue(mockDialogRef);
  
      homeComponent.createBoard();
  
      expect(mockRouter.navigate).toHaveBeenCalledWith(['board', 'testhash']);
    });
  });

});
