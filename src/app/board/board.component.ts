import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardService } from '../services/card.service';
import { ListService } from '../services/list.service';
import { SimpleCard } from '../models/simple-card';
import { Card } from '../models/card';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Board = null;
  boardLoadError = false;

  @ViewChild('addListInput') addListInput: ElementRef;
  
  addingList: Boolean = false;
  addingListName: String = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardService: BoardService,
    private listService: ListService,
    private cardService: CardService
  ) { }

  ngOnInit() {
    const hashId: string = this.activatedRoute.snapshot.params['boardId'];
    this.boardService.getBoard(hashId).subscribe(board => {
      
      for(let list of board.lists) {
        list.cards.sort((a, b) => { return a.order - b.order});
      }
      this.board = board;
    }, _ => {
      this.boardLoadError = true;
    });
  }

  onAddAnotherList() {
    this.addingList = true;
    setTimeout(() => { this.addListInput.nativeElement.focus(); }, 100);
  }

  onCreateList() {
    this.listService.createList(this.addingListName, this.board.id).subscribe(list => {
      this.board.lists.push(list);
      this.addingListName = '';
      setTimeout(() => { this.addListInput.nativeElement.focus(); }, 100);
    })
  }

  canAddList(): Boolean {
    return this.addingListName !== '';
  }

  onCancelAddList() {
    this.addingList = false;
  }

  onCardCreated(card: SimpleCard) {
    for(let list of this.board.lists) {
      if(list.id === card.trelloList) {
        const cardToAdd: Card = {
          id: card.id,
          name: card.name,
          trelloList: card.trelloList,
          order: list.cards.length
        }
        list.cards.push(cardToAdd);
        return;
      }
    }
  }

  drop(event) {

    if (event.previousContainer === event.container) {

      if(event.previousIndex !== event.currentIndex) {
        moveItemInArray(event.container.data.cards, event.previousIndex, event.currentIndex);
        const droppedCard = event.container.data.cards[event.currentIndex];
        droppedCard.order = event.currentIndex;
        
        this.cardService.updateCardOrder(droppedCard).subscribe(_ => {});
      }
    } 
    else {
      transferArrayItem(event.previousContainer.data.cards,
                      event.container.data.cards,
                      event.previousIndex,
                      event.currentIndex);

      const droppedCard = event.container.data.cards[event.currentIndex];
      droppedCard.trelloList = event.container.data.id;
      droppedCard.order = event.currentIndex;
      
      this.cardService.updateCardOrder(droppedCard).subscribe(_ => {});
    }
  }

}
