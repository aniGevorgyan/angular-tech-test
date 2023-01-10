import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list.component';
import {TodoElementModule} from "../todo-element/todo-element.module";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {TodoApiService} from "../../shared/services/todo-api/todo-api.service";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {RouterModule} from "@angular/router";
import {AddFormModule} from "../../shared/components/add-form/add-form.module";

@NgModule({
  declarations: [
    TodoListComponent
  ],
  exports: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    TodoElementModule,
    NgxSkeletonLoaderModule,
    ScrollingModule,
    RouterModule,
    AddFormModule
  ],
  providers: [
    TodoApiService
  ]
})
export class TodoListModule { }
