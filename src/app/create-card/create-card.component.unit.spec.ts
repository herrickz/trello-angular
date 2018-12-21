import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardComponent } from './create-card.component';
import { of } from 'rxjs';
import { SimpleCard } from '../models/simple-card';

describe('CreateCardComponent Unit', () => {

    let mockCardService;
    let mockCardNameTextAreaNativeElement;
    let mockOnCardCreatedEventEmitter;

    let createCardComponent: CreateCardComponent;

    beforeEach(() => {
        mockCardService = jasmine.createSpyObj('CardService', ['createCard']);
        mockCardNameTextAreaNativeElement = jasmine.createSpyObj('NativeElement', ['focus']);
        mockOnCardCreatedEventEmitter = jasmine.createSpyObj('EventEmitter', ['emit']);
        
        createCardComponent = new CreateCardComponent(mockCardService);
        createCardComponent.cardNameTextArea = { nativeElement: mockCardNameTextAreaNativeElement };
        createCardComponent.onCardCreated = mockOnCardCreatedEventEmitter;
    });

    it('isCreatingCard is false by default', () => {
        expect(createCardComponent.isCreatingCard).toEqual(false);
    });

    it('cardName is emtpy string by default', () => {
        expect(createCardComponent.cardName).toEqual('');
    });

    describe('onCreateCard', () => {
        it('sets isCreatingCard to true', () => {
            createCardComponent.onCreateCard();
    
            expect(createCardComponent.isCreatingCard).toEqual(true);
        });
    
        it('calls cardNameTextArea.nativeElement.focus() after 100ms', () => {
            jasmine.clock().install();
            createCardComponent.onCreateCard();
    
            jasmine.clock().tick(100);
    
            expect(mockCardNameTextAreaNativeElement.focus).toHaveBeenCalled();
            
            jasmine.clock().uninstall();
        });
    });

    describe('canAddCard', () => {
        it('returns false when cardName is empty string', () => {
            createCardComponent.cardName = '';
            expect(createCardComponent.canAddCard()).toEqual(false);
        });
    
        it('returns true when cardName is not empty string', () => {
            createCardComponent.cardName = 'not empty';
            expect(createCardComponent.canAddCard()).toEqual(true);
        });
    });

    describe('onCancelCreatingCard', () => {
        it('sets isCreatingCard to false', () => {
            createCardComponent.onCancelCreateCard();
            expect(createCardComponent.isCreatingCard).toEqual(false);
        });    
    });

    describe('onAddCard', () => {
        it('calls cardService.createCard with "abc" and 1 when cardName is "abc" and trelloListId is 1', () => {
            createCardComponent.cardName = 'abc';
            createCardComponent.trelloListId = 1;

            const testSimpleCard: SimpleCard = {
                id: 1,
                name: 'abc', 
                trelloList: 1
            }

            mockCardService.createCard.and.returnValue(of(testSimpleCard));

            createCardComponent.onAddCard();

            expect(mockCardService.createCard).toHaveBeenCalledWith('abc', 1);
        });

        it('calls onCardCreaeted.emit with card returned from cardService.createCard', () => {
            createCardComponent.cardName = 'abc';
            createCardComponent.trelloListId = 1;
            

            const testSimpleCard: SimpleCard = {
                id: 1,
                name: 'abc', 
                trelloList: 1
            }

            mockCardService.createCard.and.returnValue(of(testSimpleCard));

            createCardComponent.onAddCard();

            expect(mockOnCardCreatedEventEmitter.emit).toHaveBeenCalledWith(testSimpleCard);
        });

        it('calls cardNameTextArea.nativeElement.focus() after 100ms when cardService.createCard is successful', () => {
            createCardComponent.cardName = 'abc';
            createCardComponent.trelloListId = 1;
            
            const testSimpleCard: SimpleCard = {
                id: 1,
                name: 'abc', 
                trelloList: 1
            }

            mockCardService.createCard.and.returnValue(of(testSimpleCard));
            
            jasmine.clock().install();

            createCardComponent.onAddCard();

            jasmine.clock().tick(100);

            expect(mockCardNameTextAreaNativeElement.focus).toHaveBeenCalled();
            
            jasmine.clock().uninstall();
        });

        it('sets cardName to empty string when cardService.createCard is successful', () => {
            createCardComponent.cardName = 'abc';
            createCardComponent.trelloListId = 1;
            
            const testSimpleCard: SimpleCard = {
                id: 1,
                name: 'abc', 
                trelloList: 1
            }

            mockCardService.createCard.and.returnValue(of(testSimpleCard));
            
            createCardComponent.onAddCard();

            expect(createCardComponent.cardName).toEqual('');
            
        });
    });
});