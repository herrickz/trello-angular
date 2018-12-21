import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { SimpleBoard } from '../models/simple-board';
import { Board } from '../models/board';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private http: HttpClient
  ) { }

  getBoards(): Observable<SimpleBoard[]> {
    return this.http.get<SimpleBoard[]>(`${environment.apiUrl}/board/`);
  }

  getBoard(hashId: string): Observable<Board> {
    return this.http.get<Board>(`${environment.apiUrl}/board/${hashId}/`);
  }
  
  createBoard(boardName: string): Observable<Board> {
    return this.http.post<Board>(`${environment.apiUrl}/board/`, { name: boardName });
  }
}
