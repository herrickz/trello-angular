import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { of } from 'rxjs';
import { SimpleCard } from '../models/simple-card';
import { NullAstVisitor } from '@angular/compiler';

describe('ListComponent Unit', () => {

    let mockCardService;
    let mockCardNameTextAreaNativeElement;
    let mockOnCardCreatedEventEmitter;

    let listComponent: ListComponent;

    beforeEach(() => {
        mockCardService = jasmine.createSpyObj('CardService', ['createCard']);
        mockCardNameTextAreaNativeElement = jasmine.createSpyObj('NativeElement', ['focus', 'scrollIntoView']);
        mockOnCardCreatedEventEmitter = jasmine.createSpyObj('EventEmitter', ['emit']);
        
        listComponent = new ListComponent(mockCardService, null);
        listComponent.cardNameTextArea = { nativeElement: mockCardNameTextAreaNativeElement };
    });

    it('isCreatingCard is false by default', () => {
        expect(listComponent.isCreatingCard).toEqual(false);
    });

    it('cardName is emtpy string by default', () => {
        expect(listComponent.cardName).toEqual('');
    });

    describe('onCreateCard', () => {
        it('sets isCreatingCard to true', () => {
            listComponent.onCreateCard();
    
            expect(listComponent.isCreatingCard).toEqual(true);
        });

        it('calls cardNameTextArea.nativeElement.scrollIntoView() after 100ms', () => {
            jasmine.clock().install();
            listComponent.onCreateCard();
    
            jasmine.clock().tick(100);
    
            expect(mockCardNameTextAreaNativeElement.scrollIntoView).toHaveBeenCalled();
            
            jasmine.clock().uninstall();
        });
    
        it('calls cardNameTextArea.nativeElement.focus() after 100ms', () => {
            jasmine.clock().install();
            listComponent.onCreateCard();
    
            jasmine.clock().tick(100);
    
            expect(mockCardNameTextAreaNativeElement.focus).toHaveBeenCalled();
            
            jasmine.clock().uninstall();
        });
    });

    describe('canAddCard', () => {
        it('returns false when cardName is empty string', () => {
            listComponent.cardName = '';
            expect(listComponent.canAddCard()).toEqual(false);
        });
    
        it('returns true when cardName is not empty string', () => {
            listComponent.cardName = 'not empty';
            expect(listComponent.canAddCard()).toEqual(true);
        });
    });

    describe('onCancelCreatingCard', () => {
        it('sets isCreatingCard to false', () => {
            listComponent.onCancelCreateCard();
            expect(listComponent.isCreatingCard).toEqual(false);
        });    
    });

    describe('onAddCard', () => {
        it('calls cardService.createCard with "abc" and 1 when cardName is "abc" and trelloListId is 1', () => {
            listComponent.cardName = 'abc';
            listComponent.list =  {
                id: 1,
                name: 'abc',
                cards: []
            }

            const testSimpleCard: SimpleCard = {
                id: 1,
                name: 'abc', 
                trelloList: 1
            }

            mockCardService.createCard.and.returnValue(of(testSimpleCard));

            listComponent.onAddCard();

            expect(mockCardService.createCard).toHaveBeenCalledWith('abc', 1);
        });

        it('calls cardNameTextArea.nativeElement.focus() after 100ms when cardService.createCard is successful', () => {
            listComponent.cardName = 'abc';
            listComponent.list =  {
                id: 1,
                name: 'abc',
                cards: []
            }
            
            const testSimpleCard: SimpleCard = {
                id: 1,
                name: 'abc', 
                trelloList: 1
            }

            mockCardService.createCard.and.returnValue(of(testSimpleCard));
            
            jasmine.clock().install();

            listComponent.onAddCard();

            jasmine.clock().tick(100);

            expect(mockCardNameTextAreaNativeElement.focus).toHaveBeenCalled();
            
            jasmine.clock().uninstall();
        });

        it('sets cardName to empty string when cardService.createCard is successful', () => {
            listComponent.cardName = 'abc';
            listComponent.list =  {
                id: 1,
                name: 'abc',
                cards: []
            }
            
            const testSimpleCard: SimpleCard = {
                id: 1,
                name: 'abc', 
                trelloList: 1
            }

            mockCardService.createCard.and.returnValue(of(testSimpleCard));
            
            listComponent.onAddCard();

            expect(listComponent.cardName).toEqual('');
            
        });
    });
});