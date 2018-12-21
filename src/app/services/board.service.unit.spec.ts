import { BoardService } from './board.service';

describe('BoardService Unit', () => {

  let boardService: BoardService
  let mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('http', ['get', 'post']);

    boardService = new BoardService(mockHttp);
  });

  describe('getBoards', () => {
    it('should call http.get with http://localhost:8000/api/board/', () => {

      boardService.getBoards();
  
      expect(mockHttp.get).toHaveBeenCalledWith('http://localhost:8000/api/board/');
    });
  });

  describe('getBoard', () => {
    it('with abc123 should call http.get with http://localhost:8000/api/board/abc123/', () => {

      boardService.getBoard('abc123');
  
      expect(mockHttp.get).toHaveBeenCalledWith('http://localhost:8000/api/board/abc123/')
    });
  });

  describe('createBoard', () => {
    it('with name test board should call http.post with http://localhost:8000/api/board/ and { name: \'test board\' }', () => {

      boardService.createBoard('test board');
  
      expect(mockHttp.post).toHaveBeenCalledWith('http://localhost:8000/api/board/', { name: 'test board' });
    });
  });
  
});
