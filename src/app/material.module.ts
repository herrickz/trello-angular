
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatRippleModule, MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatCardModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        DragDropModule,
        MatIconModule,
        MatToolbarModule
    ],
    exports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatCardModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        DragDropModule,
        MatIconModule,
        MatToolbarModule
    ]
})
export class MaterialModule { }