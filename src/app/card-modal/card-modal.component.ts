import { Component, OnInit, Inject, ViewChild, ElementRef, Sanitizer, SecurityContext, ChangeDetectorRef } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { CardService } from '../services/card.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Card } from '../models/card';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as showdown from 'showdown';
import { Observable, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit {

  card: Card = null;
  isEditingCardDescription: Boolean = false;
  editCardDescriptionText: String = '';

  cardDescriptionHtmlPreview: SafeHtml;

  saveCardDescriptionSubscription: Subscription;

  @ViewChild('cardDescriptionTextArea') cardDescriptionTextArea: ElementRef;

  constructor(
    public dialogReference: MatDialogRef<BoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() { 
    this.cardService.getCard(this.data.id).subscribe(card => {
      this.card = card;
      this.updateCardDescriptionHtmlPreview(card);
    });
  }

  onEditCardDescription() {
    this.isEditingCardDescription = true;

    setTimeout(() => {
      this.resizeTextArea();
      this.cardDescriptionTextArea.nativeElement.focus();
      this.cardDescriptionTextArea.nativeElement.select();
    }, 0);
  }

  resizeTextArea() {
    this.cardDescriptionTextArea.nativeElement.style.height = 'auto';
    this.cardDescriptionTextArea.nativeElement.style.height = this.cardDescriptionTextArea.nativeElement.scrollHeight+'px';
  }

  blurCardDescriptionTextArea() {
    
    this.saveCardDescriptionSubscription = timer(200).subscribe(() => {
      this.cardService.updateCardDescription(this.card, this.editCardDescriptionText.trim()).subscribe(card => {  
        this.card.description = card.description;
        this.updateCardDescriptionHtmlPreview(card);
      });
    });
    
  }

  updateCardDescriptionHtmlPreview(card: Card) {
    this.isEditingCardDescription = false;
    this.editCardDescriptionText = card.description;
    let converter = new showdown.Converter();
    this.cardDescriptionHtmlPreview = this.sanitizer.sanitize(SecurityContext.HTML, converter.makeHtml(this.editCardDescriptionText));  
  }
  
  shouldShowAddMoreDescription(): Boolean {
    return !this.isEditingCardDescription && this.editCardDescriptionText.trim() === '';
  }

  shouldShowEditCardDescription(): Boolean {
    return !this.isEditingCardDescription && this.editCardDescriptionText.trim() !== '';
  }

  onCancelSaveDescription() {
    this.saveCardDescriptionSubscription.unsubscribe();
    this.isEditingCardDescription = false;
    this.editCardDescriptionText = this.card.description;
  }

}
