import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { List } from '../models/list';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';
import { MatDialog } from '@angular/material';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input('list') list: List

  @Output('onCardDropped') onCardDropped: EventEmitter<CdkDragDrop<List>> = new EventEmitter();

  @ViewChild('cardNameTextArea') cardNameTextArea: ElementRef = null;

  isCreatingCard: Boolean = false;
  cardName: String = '';

  constructor(
    private cardService: CardService,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  onCreateCard() {
    this.isCreatingCard = true;

    if(this.cardNameTextArea !== null) {
      setTimeout(() => {
        this.cardNameTextArea.nativeElement.scrollIntoView();
        this.cardNameTextArea.nativeElement.focus();
      }, 100);
    }
  }

  onAddCard() {
    if(this.list !== null && this.canAddCard()) {
      this.cardService.createCard(this.cardName, this.list.id).subscribe(card => {

        const cardToAdd: Card = {
          id: card.id,
          name: card.name,
          trelloList: card.trelloList,
          order: this.list.cards.length,
          description: ''
        }

        this.list.cards.push(cardToAdd);

        setTimeout(() => {
          this.cardNameTextArea.nativeElement.scrollIntoView();
          this.cardNameTextArea.nativeElement.focus();
        }, 100);

        this.cardName = '';
      });
    }
  }

  onCancelCreateCard() {
    this.isCreatingCard = false;
  }

  canAddCard() {
    return this.cardName !== '';
  }

  drop(event: CdkDragDrop<List>) {
    this.onCardDropped.emit(event);
  }

  onOpenCard(card: Card) {
    this.dialog.open(CardModalComponent, { 
      data: { id: card.id },
      panelClass: 'card-modal'
    });
  }
}
