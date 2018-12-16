
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatRippleModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatCardModule,
        MatRippleModule
    ],
    exports: [
        MatButtonModule, 
        MatCheckboxModule,
        MatCardModule,
        MatRippleModule
    ]
})
export class MaterialModule { }