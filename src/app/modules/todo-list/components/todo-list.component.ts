import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {TodoApiService} from "../../../shared/services/todo-api/todo-api.service";
import {takeUntil} from "rxjs/operators";
import {TodoI} from "../../../shared/interfaces/todo.interface";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  public todos?: TodoI[];

  public loading: boolean = false;

  public addFormShown: boolean = false;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(protected readonly todoApiService: TodoApiService) {}

  public ngOnInit(): void {
    this.loading = true;
    this.todoApiService.getTodoList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((todoList: TodoI[]) => {
        this.todos = todoList;
        this.loading = false;
      })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showAddForm(): void {
    this.addFormShown = true;
  }

  public cancelledTaskCreation(): void {
    this.addFormShown = false;
  }

  public newTaskCreated(task: TodoI): void {
    this.todos = [...this.todos, task];
    this.addFormShown = false;
  }

  public todoDeleted(id: number): void {
    this.todos = this.todos.filter(el => el.id !== id);
  }

  public todoUpdated(id: number, todo: TodoI): void {
    this.todos = this.todos.map(el => {
      if (el.id !== id) {
        return el;
      }
      return {...el, ...todo};
    });
  }
}
