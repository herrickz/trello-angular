import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private http: HttpClient
  ) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${environment.apiUrl}/api/board/`);
  }
}
