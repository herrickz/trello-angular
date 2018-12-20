
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatRippleModule, MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatCardModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatCardModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MaterialModule { }