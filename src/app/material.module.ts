
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatRippleModule, MatProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatCardModule,
        MatRippleModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatCardModule,
        MatRippleModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule { }