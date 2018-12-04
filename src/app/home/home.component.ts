import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board } from '../models/board';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  boards: Board[];

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit() { 
    this.boardService.getBoards().subscribe(boards => {
      this.boards = boards;
    })
  }

}
