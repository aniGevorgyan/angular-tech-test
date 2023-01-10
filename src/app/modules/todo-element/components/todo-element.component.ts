import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';
import {TodoApiService} from "../../../shared/services/todo-api/todo-api.service";
import {TodoI} from "../../../shared/interfaces/todo.interface";

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-element.component.html',
  styleUrls: ['./todo-element.component.scss']
})
export class TodoElementComponent {
  @Input()
  public data!: TodoI;

  @Output()
  public deleted: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public updated: EventEmitter<{ id: number, todo: TodoI }> = new EventEmitter<{ id: number, todo: TodoI }>();

  public updateFormShown: boolean = false;

  constructor(protected readonly todoApiService: TodoApiService) {}

  public deleteTask(): void {
    this.todoApiService.deleteTodo(this.data.id).subscribe(() => {
      this.deleted.emit(this.data.id)
    });
  }

  public doneTask(): void {
    const newData: TodoI = {...this.data, done: moment().format('DD-MM-YYYY')};
    if (this.data.done) {
      newData.done = false;
    }
    this.todoApiService.updateTodo(this.data.id, newData).subscribe(() => {
      this.updated.emit({id: this.data.id, todo: newData});
    });
    this.updated.emit({id: this.data.id, todo: newData});
  }

  public todoUpdated(todo: TodoI): void {
    this.updated.emit({id: todo.id, todo: todo});
    this.updateFormShown = false;
  }
}
