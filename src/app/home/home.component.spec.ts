import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { Board } from '../models/board';

describe('HomeComponent', () => {

  it('ngOnInit sets HomeComponent.boards returned from boardService.getBoards()', () => {

    const boards: Board[] = [ { name: "board1" } ];
    const boardServiceSpy = jasmine.createSpyObj('boardService', {
      getBoards: of(boards)
    });
    
    const homeComponent = new HomeComponent(boardServiceSpy);

    homeComponent.ngOnInit();

    expect(homeComponent.boards).toEqual(boards);

  });
});
