import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { SimpleBoard } from '../models/simple-board';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  boards: SimpleBoard[] = null;

  errorFetchingBoards = false;

  constructor(
    private boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit() { 
    this.boardService.getBoards().subscribe(boards => {
      this.boards = boards;
    }, () => {
      this.errorFetchingBoards = true
    });
  }

  goToBoard(boardHashId: string) {
    this.router.navigate(['board', boardHashId]);
  }

}
