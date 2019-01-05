import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SimpleBoard } from '../models/simple-board';
import { Board } from '../models/board';
import { List } from '../models/list';
import { SimpleCard } from '../models/simple-card';
import { Card } from '../models/card';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('BoardComponent Unit', () => {

  let mockActivatedRoute;
  let mockBoardService;
  let mockListService;
  let mockCardService;
  let mockAddListInputNativeElement;
  let mockListContainerNativeElement;

  let boardComponent: BoardComponent;

  beforeEach(() => {
    mockActivatedRoute = { snapshot: { params: {}}};
    mockBoardService = jasmine.createSpyObj('BoardService', ['getBoard']);
    mockListService = jasmine.createSpyObj('ListService', ['createList']);
    mockCardService = jasmine.createSpyObj('CardService', ['updateCardOrder']);
    mockAddListInputNativeElement = jasmine.createSpyObj('NativeElement', ['focus']);
    mockListContainerNativeElement = jasmine.createSpyObj('NativeElement', ['focus']);

    mockListContainerNativeElement.scrollLeft = 0;

    mockCardService.updateCardOrder.and.returnValue(of({}));

    boardComponent = new BoardComponent(mockActivatedRoute, mockBoardService, mockListService, mockCardService);
    boardComponent.addListInput = { nativeElement: mockAddListInputNativeElement };
    boardComponent.listContainer = { nativeElement: mockListContainerNativeElement };

  });

  describe('ngOnInit', () => {

    it('should call boardService with abc123 when activatedRoute.snapshot.params.hashId is abc123', () => {

      mockActivatedRoute.snapshot.params = {
        boardId: 'abc123'
      }

      const testBoard: Board = {
        name: 'test board',
        hashId: 'abc123',
        id: 1,
        lists: []
      }
      mockBoardService.getBoard.and.returnValue(of(testBoard));

      boardComponent.ngOnInit();

      expect(mockBoardService.getBoard).toHaveBeenCalledWith('abc123');
    });

    it('should set boardLoadError to true when boardService returns error', () => {

      mockActivatedRoute.snapshot.params = {
        boardId: 'abc123'
      }
      mockBoardService.getBoard.and.returnValue(throwError('Some error'));

      boardComponent.ngOnInit();

      expect(boardComponent.boardLoadError).toEqual(true)
    });

    it('should sort all card lists of board returned from boardService.getBoard', () => {

      mockActivatedRoute.snapshot.params = {
        boardId: 'abc123'
      }

      const testBoard: Board = {
        name: 'test board',
        hashId: 'abc123',
        id: 1,
        lists: [ 
          {
            id: 1,
            name: 'first list',
            cards: [
              {
                id: 2,
                name: 'second card',
                order: 1,
                trelloList: 1
              },
              {
                id: 1,
                name: 'first card',
                order: 0,
                trelloList: 1
              }
            ]
          },
          {
            id: 2,
            name: 'second list',
            cards: [
              {
                id: 5,
                name: 'card',
                order: 3,
                trelloList: 1
              },
              {
                id: 4,
                name: 'card',
                order: 2,
                trelloList: 1
              },
              {
                id: 3,
                name: 'card',
                order: 1,
                trelloList: 1
              },
              {
                id: 2,
                name: 'card',
                order: 0,
                trelloList: 1
              }
            ]
          }
        ]
      }
      mockBoardService.getBoard.and.returnValue(of(testBoard));

      boardComponent.ngOnInit();

      expect(boardComponent.board.lists[0].cards[0].order).toEqual(0);
      expect(boardComponent.board.lists[0].cards[1].order).toEqual(1);
      
      expect(boardComponent.board.lists[1].cards[0].order).toEqual(0);
      expect(boardComponent.board.lists[1].cards[1].order).toEqual(1);
      expect(boardComponent.board.lists[1].cards[2].order).toEqual(2);
      expect(boardComponent.board.lists[1].cards[3].order).toEqual(3);
    });

  });
  
  describe('drop', () => {

    it('with the card being in the same container from position 0 to position 2 reorders array (id) -> [2, 3, 1]', () => {

      const card1 = { id: 1, name: 'card', order: 0 };
      const card2 = {id: 2, name: 'card', order: 1 };
      const card3 = { id: 3, name: 'card', order: 2 };

      const container = { 
        data: {

          cards: [card1, card2, card3] 
        } 
      };
      
      const event = {
        previousContainer: container,
        container: container,
        previousIndex: 0,
        currentIndex: 2
      }

      boardComponent.drop(event);

      expect(event.container.data.cards[0].id).toEqual(2);
      expect(event.container.data.cards[1].id).toEqual(3);
      expect(event.container.data.cards[2].id).toEqual(1);
    });

    it('with the card being in the same container from position 0 to position 2 sets droppedCard.order to 2', () => {

      const card1 = { id: 1, name: 'card', order: 0 };
      const card2 = {id: 2, name: 'card', order: 1 };
      const card3 = { id: 3, name: 'card', order: 2 };

      const container = { data: { cards: [card1, card2, card3] } };

      const event = {
        previousContainer: container,
        container: container,
        previousIndex: 0,
        currentIndex: 2
      }

      boardComponent.drop(event);

      expect(event.container.data.cards[2].order).toEqual(2);
    });

    it('with the card being in the same container moving the card to the same position does nothing', () => {

      const card1 = { id: 1, name: 'card', order: 0 };
      const card2 = {id: 2, name: 'card', order: 1 };
      const card3 = { id: 3, name: 'card', order: 2 };

      const container = { data: { cards: [card1, card2, card3] } };

      const event = {
        previousContainer: container,
        container: container,
        previousIndex: 0,
        currentIndex: 0
      }

      boardComponent.drop(event);

      expect(event.container.data.cards[0].order).toEqual(0);
      expect(event.container.data.cards[1].order).toEqual(1);
      expect(event.container.data.cards[2].order).toEqual(2);
    });

    it('with the card being in the same container from position 0 to position 2 calls cardService.updateCardOrder with updated card', () => {

      const card1 = { id: 1, name: 'card', order: 0 };
      const card2 = {id: 2, name: 'card', order: 1 };
      const card3 = { id: 3, name: 'card', order: 2 };

      const container = { data: { cards: [card1, card2, card3] } };

      const event = {
        previousContainer: container,
        container: container,
        previousIndex: 0,
        currentIndex: 2
      }

      boardComponent.drop(event);

      const expectedCard = { id: 1, name: 'card', order: 2 };

      expect(mockCardService.updateCardOrder).toHaveBeenCalledWith(expectedCard);
    });

    it('with the card being to a different container from position 0 in container 1 to position 1 in container 1 reorders container 1 (id) -> [2, 3] and container 2 -> [1, 4]', () => {

      const card1 = { id: 1, name: 'card', order: 0 };
      const card2 = {id: 2, name: 'card', order: 1 };
      const card3 = { id: 3, name: 'card', order: 2 };
  
      const card4 = { id: 4, name: 'card', order: 0 };
  
      const container1 = { data: { cards: [card1, card2, card3] } };
      const container2 = { data: { cards: [card4] } };
      
      const event = {
        previousContainer: container1,
        container: container2,
        previousIndex: 0,
        currentIndex: 0
      }
  
      boardComponent.drop(event);
  
      expect(event.previousContainer.data.cards[0].id).toEqual(2);
      expect(event.previousContainer.data.cards[1].id).toEqual(3);
  
      expect(event.container.data.cards[0].id).toEqual(1);
      expect(event.container.data.cards[1].id).toEqual(4);
    });
  
    it('with the card being to a different container from position 0 in container 1 to position 1 in container 1 reorders array (id) -> [2, 3, 1]', () => {
  
      const card1 = { id: 1, name: 'card', order: 0 };
      const card2 = {id: 2, name: 'card', order: 1 };
      const card3 = { id: 3, name: 'card', order: 2 };
  
      const card4 = { id: 4, name: 'card', order: 0 };
  
      const container1 = { data: { cards: [card1, card2, card3] } };
      const container2 = { data: { cards: [card4] } };
      
      const event = {
        previousContainer: container1,
        container: container2,
        previousIndex: 0,
        currentIndex: 0
      }
  
      boardComponent.drop(event);
  
      expect(mockCardService.updateCardOrder).toHaveBeenCalledWith(card1);
    });

  });
  
  describe('onAddAnotherList', () => {
    it('sets addingList to true', () => {
      boardComponent.onAddAnotherList();
      expect(boardComponent.addingList).toEqual(true);
    });
  
    it('calls addListInput.nativeElement.focus() after 100ms', () => {
      jasmine.clock().install();
  
      boardComponent.onAddAnotherList()
  
      jasmine.clock().tick(100);
  
      expect(mockAddListInputNativeElement.focus).toHaveBeenCalled();
  
      jasmine.clock().uninstall();
    });
  });

  describe('onCreateList', () => {

    it('calls listService.createList with "abc" and 1 when addListName is "abc" and board.id is 1', () => {

      const testList: List = {
        id: 1,
        name: 'abc',
        cards: []
      }

      mockListService.createList.and.returnValue(of(testList));

      boardComponent.addingListName = 'abc';
      boardComponent.board = {
        id: 1,
        name: 'asd',
        lists: [],
        hashId: 'asd'
      }

      boardComponent.onCreateList();

      expect(mockListService.createList).toHaveBeenCalledWith('abc', 1);
    });

    it('adds list to board.list after listService.createList is successful', () => {

      const testList: List = {
        id: 1,
        name: 'abc',
        cards: []
      }

      mockListService.createList.and.returnValue(of(testList));

      boardComponent.addingListName = 'abc';
      boardComponent.board = {
        id: 1,
        name: 'asd',
        lists: [],
        hashId: 'asd'
      }
      
      boardComponent.onCreateList();

      expect(boardComponent.board.lists[0]).toEqual(testList);
    });

    it('sets addListName to empty string after listService.createList is successful', () => {

      const testList: List = {
        id: 1,
        name: 'abc',
        cards: []
      }

      mockListService.createList.and.returnValue(of(testList));

      boardComponent.addingListName = 'abc';
      boardComponent.board = {
        id: 1,
        name: 'asd',
        lists: [],
        hashId: 'asd'
      }
      
      boardComponent.onCreateList();

      expect(boardComponent.addingListName).toEqual('');
    });

    it('calls addListInputNativeElement.focus() after 100ms after listService.createList is successful', () => {

      const testList: List = {
        id: 1,
        name: 'abc',
        cards: []
      }

      mockListService.createList.and.returnValue(of(testList));

      boardComponent.addingListName = 'abc';
      boardComponent.board = {
        id: 1,
        name: 'asd',
        lists: [],
        hashId: 'asd'
      }

      jasmine.clock().install();
      
      boardComponent.onCreateList();

      jasmine.clock().tick(100);

      expect(mockAddListInputNativeElement.focus).toHaveBeenCalled();

      jasmine.clock().uninstall();
    });
  });

  describe('canAddList', () => {
    it('returns false when addingListName is empty string', () => {

      boardComponent.addingListName = '';
  
      expect(boardComponent.canAddList()).toEqual(false);
    });
  
    it('returns true when addingListName is not empty string', () => {
  
      boardComponent.addingListName = 'asd';
  
      expect(boardComponent.canAddList()).toEqual(true);
    });
  });

  describe('onCancelAddList', () => {
    it('sets addingList to false', () => {
      boardComponent.onCancelAddList();
  
      expect(boardComponent.addingList).toEqual(false);
    });
  });

  describe('onCardCreated', () => {
    it('with trelloList 1 adds card to trelloList 1', () => {

      boardComponent.board = {
        hashId: 'abc',
        id: 1,
        name: 'abc',
        lists: [
          { 
            id: 1,
            name: 'abc', 
            cards: []
          }
        ]
      }
  
      const testSimpleCard: SimpleCard = {
        id: 1,
        name: 'hello',
        trelloList: 1
      }
  
      boardComponent.onCardCreated(testSimpleCard);
  
      const expectedCard: Card = {
        id: 1,
        name: 'hello',
        trelloList: 1,
        order: 0
      }
  
      expect(boardComponent.board.lists[0].cards[0]).toEqual(expectedCard);
    });
  });
});
