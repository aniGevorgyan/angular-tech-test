import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoElementComponent } from './components/todo-element.component';
import {AddFormModule} from "../../shared/components/add-form/add-form.module";



@NgModule({
  declarations: [
    TodoElementComponent
  ],
  exports: [
    TodoElementComponent
  ],
    imports: [
        CommonModule,
        AddFormModule
    ]
})
export class TodoElementModule { }
