import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';

describe('BoardService', () => {

  it('getBoards should call http.get with http://localhost:8000/api/board/', () => {
    const httpSpy = jasmine.createSpyObj('http', ['get']);
    const service: BoardService = new BoardService(httpSpy);

    service.getBoards();

    expect(httpSpy.get).toHaveBeenCalledWith('http://localhost:8000/api/board/');
  });

  it('getBoard with abc123 should call http.get with http://localhost:8000/api/board/abc123/', () => {
    const httpSpy = jasmine.createSpyObj('http', ['get']);
    const service: BoardService = new BoardService(httpSpy);

    service.getBoard('abc123');

    expect(httpSpy.get).toHaveBeenCalledWith('http://localhost:8000/api/board/abc123/')
  });

});
