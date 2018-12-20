import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.css']
})
export class CreateBoardDialogComponent implements OnInit {

  boardName: string = '';

  constructor(
    public dialogReference: MatDialogRef<CreateBoardDialogComponent>,
    private boardService: BoardService
  ) { }

  ngOnInit() { }

  onCancel() {
    this.dialogReference.close({ didCreateBoard: false });
  }

  onCreateBoard() {
    this.boardService.createBoard(this.boardName).subscribe(board => {
      this.dialogReference.close({ didCreateBoard: true, board: board });
    });
  }

  canAddBoard(): Boolean {
    return this.boardName != '';
  }

}
