import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card';
import { environment } from '../../environments/environment';
import { SimpleCard } from '../models/simple-card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http: HttpClient
  ) { }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(`${environment.apiUrl}/card/${id}/`);
  }

  createCard(name: String, listId: number): Observable<SimpleCard> {
    return this.http.post<SimpleCard>(`${environment.apiUrl}/card/`, { name: name, trelloList: listId });
  }
  
  updateCardOrder(card: Card): Observable<Card> {
    return this.http.patch<Card>(`${environment.apiUrl}/card/${card.id}/`, { id: card.id, order: card.order, trelloList: card.trelloList });
  }
}
