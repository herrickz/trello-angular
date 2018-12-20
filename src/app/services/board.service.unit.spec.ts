import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';

describe('BoardService Unit', () => {

  let boardService: BoardService
  let mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('http', ['get', 'post']);

    boardService = new BoardService(mockHttp);
  });

  it('getBoards should call http.get with http://localhost:8000/api/board/', () => {

    boardService.getBoards();

    expect(mockHttp.get).toHaveBeenCalledWith('http://localhost:8000/api/board/');
  });

  it('getBoard with abc123 should call http.get with http://localhost:8000/api/board/abc123/', () => {

    boardService.getBoard('abc123');

    expect(mockHttp.get).toHaveBeenCalledWith('http://localhost:8000/api/board/abc123/')
  });

  it('createBoard with name test board should call http.post with http://localhost:8000/api/board/ and { name: \'test board\' }', () => {

    boardService.createBoard('test board');

    expect(mockHttp.post).toHaveBeenCalledWith('http://localhost:8000/api/board/', { name: 'test board' });
  });
});
