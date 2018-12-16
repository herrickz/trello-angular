import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Board = null;
  boardLoadError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardService: BoardService
  ) { }

  ngOnInit() {
    const hashId: string = this.activatedRoute.snapshot.params['boardId'];
    this.boardService.getBoard(hashId).subscribe(board => {
      this.board = board;
    }, error => {
      this.boardLoadError = true;
    });

  }

}
