import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../models/list';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient
  ) { }

  createList(name: String, boardId: number): Observable<List> {
    return this.http.post<List>(`${environment.apiUrl}/list/`, { name: name, board: boardId });
  }
}
