import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { SimpleBoard } from '../models/simple-board';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateBoardDialogComponent } from '../create-board-dialog/create-board-dialog.component';

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
    private router: Router,
    public dialog: MatDialog
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

  createBoard() {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined && result.didCreateBoard) {
        this.router.navigate(['board', result.board.hashId])
      }
    });
  }
}
