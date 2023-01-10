import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './components/view.component';
import {ViewRoutingModule} from "./view-routing.module";
import {TodoListModule} from "../../modules/todo-list/todo-list.module";
import {ContainerModule} from "../../shared/components/container/container.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    TodoListModule,
    ContainerModule,
    HttpClientModule
  ]
})
export class ViewModule { }
