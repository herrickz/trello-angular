
import { ListService } from './list.service';

describe('ListService', () => {
    let listService: ListService
    let mockHttp;
  
    beforeEach(() => {
      mockHttp = jasmine.createSpyObj('http', ['post']);
  
      listService = new ListService(mockHttp);
    });
    
    describe('createList', () => {
        it('with name "list name" and boardId 1 should call http.post with http://localhost:8000/api/list/ and { name: "list name", board: 1 }', () => {

            listService.createList('list name', 1);
    
            expect(mockHttp.post).toHaveBeenCalledWith('http://localhost:8000/api/list/', { name: 'list name', board: 1 });
        });
    });
    
});
