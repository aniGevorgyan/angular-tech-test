import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {TodoI} from "../../interfaces/todo.interface";

@Injectable()
export class TodoApiService {
  private readonly apiBase = environment.apiBase;

  constructor(private readonly httpClient: HttpClient) {}

  public getTodoList(): Observable<TodoI[]> {
    return this.httpClient.get<TodoI[]>(`${this.apiBase}/tasks`);
  }

  public getTodoById(id: number): Observable<TodoI> {
    return this.httpClient.get<TodoI>(`${this.apiBase}/tasks/${id}`);
  }

  public createTodo(todo: TodoI): Observable<TodoI> {
    return this.httpClient.post<TodoI>(`${this.apiBase}/tasks`, {...todo});
  }

  public updateTodo(id: number, todo: TodoI): Observable<TodoI> {
    return this.httpClient.patch<TodoI>(`${this.apiBase}/tasks/${id}`, {...todo});
  }

  public deleteTodo(id: number): Observable<TodoI[]> {
    return this.httpClient.delete<TodoI[]>(`${this.apiBase}/tasks/${id}`);
  }
}
