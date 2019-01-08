import { Component, OnInit, Inject } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { CardService } from '../services/card.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Card } from '../models/card';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit {

  card: Card = null;

  constructor(
    public dialogReference: MatDialogRef<BoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardService
  ) { }

  ngOnInit() { 
    this.cardService.getCard(this.data.id).subscribe(card => {
      this.card = card;
    });
  }

}
