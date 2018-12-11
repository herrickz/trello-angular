import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SimpleBoard } from '../models/simple-board';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private http: HttpClient
  ) { }

  getBoards(): Observable<SimpleBoard[]> {
    return this.http.get<SimpleBoard[]>(`${environment.apiUrl}/api/board/`);
  }

  getBoard(hashId: string): Observable<Board> {
    return this.http.get<Board>(`${environment.apiUrl}/api/board/${hashId}/`)
  }
}
