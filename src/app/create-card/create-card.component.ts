import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CardService } from '../services/card.service';
import { SimpleCard } from '../models/simple-card';

@Component({
  selector: 'create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  @Input('trelloList') trelloListId: number = null;

  @Output() onCardCreated: EventEmitter<any> = new EventEmitter();

  @ViewChild('cardNameTextArea') cardNameTextArea: ElementRef = null;

  isCreatingCard: Boolean = false;
  cardName: String = '';

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() { }

  onCreateCard() {
    this.isCreatingCard = true;

    if(this.cardNameTextArea !== null) {
      setTimeout(() => {
        this.cardNameTextArea.nativeElement.focus();
      }, 100);
    }

  }

  canAddCard() {
    return this.cardName !== '';
  }

  onCancelCreateCard() {
    this.isCreatingCard = false;
    this.cardName = '';
  }

  onAddCard() {
    if(this.trelloListId !== null) {
      this.cardService.createCard(this.cardName, this.trelloListId).subscribe(card => {
        this.onCardCreated.emit(card);

        setTimeout(() => {
          this.cardNameTextArea.nativeElement.focus();
        }, 100);
        this.cardName = '';
      });
    }
  }

}
