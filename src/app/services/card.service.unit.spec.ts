import { CardService } from './card.service';
import { Card } from '../models/card';

describe('CardService Unit', () => {

  let cardService: CardService
  let mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('http', ['post', 'patch']);

    cardService = new CardService(mockHttp);
  });

  describe('createCard', () => {
    it('with name "abc" and listId: 1 should call http.post with http://localhost:8000/api/card/ and { name: "abc", trelloList: 1 }', () => {
      cardService.createCard('abc', 1);
  
      expect(mockHttp.post).toHaveBeenCalledWith('http://localhost:8000/api/card/', { name: 'abc', trelloList: 1 });
    });
  
  });

  describe('updateCardOrder', () => {
    it('with { id: 1, name: "card", order: 0, trelloList: 1 } should call http.patch with http://localhost:8000/api/card/1/ with { id: 1, order: 0, trelloList: 1 }', () => {

      const testCard: Card = { id: 1, name: 'card', order: 0, trelloList: 1, description: '' };
  
      cardService.updateCardOrder(testCard);
  
      expect(mockHttp.patch).toHaveBeenCalledWith('http://localhost:8000/api/card/1/', { id: testCard.id, order: testCard.order, trelloList: testCard.trelloList });
    });
  });

});
