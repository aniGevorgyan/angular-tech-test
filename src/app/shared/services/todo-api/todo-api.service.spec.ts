import {TestBed, tick, waitForAsync} from '@angular/core/testing';

import { TodoApiService } from './todo-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Observable, of} from 'rxjs';
import {TodoI} from "../../interfaces/todo.interface";
import {HttpClient} from "@angular/common/http";

describe('TodoApiService', () => {
  let service: TodoApiService;
  let httpTestingController: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoApiService
      ],
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TodoApiService);
    httpTestingController = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todo list', () => {
    jasmine.createSpy('httpTestingController.get').and.callFake((arg): Observable<TodoI[]> => of([]));
    service.getTodoList().subscribe((res) => {
      expect(res).toBe([]);
    })
  });

  it('should get todo item', waitForAsync(() => {
    jasmine.createSpy('httpTestingController.get').and.callFake((arg): TodoI => ({
        id: -4,
        description: '',
        label: '',
        done: false,
        category: ''
      })
    );
    service.getTodoById(-4).subscribe((res) => {
      expect(res.id).toBe(-4);
    })
  }));

  it('should create todo', () => {
    jasmine.createSpy('httpTestingController.post').and.callFake((arg, body): Observable<TodoI> => of(body));
    service.createTodo({category: "", description: "", done: undefined, id: -1, label: ""}).subscribe((res) => {
      expect(res.id).toBe(-1);
    })
  });

  it('should update todo', () => {
    jasmine.createSpy('httpTestingController.patch').and.callFake((arg, body): Observable<TodoI> => of(body));
    service.updateTodo(-1, {category: "", description: "", done: undefined, id: -1, label: ""}).subscribe((res) => {
      expect(res.id).toBe(-1);
    })
  });

  it('should delete todo', () => {
    jasmine.createSpy('httpTestingController.patch').and.callFake((arg, body): Observable<TodoI> => of(body));
    service.updateTodo(-1, {category: "", description: "", done: undefined, id: -1, label: ""}).subscribe((res) => {
      expect(res.id).toBe(-1);
    })
  });
});
