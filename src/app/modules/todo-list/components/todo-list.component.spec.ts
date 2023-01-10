import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import {TodoApiService} from "../../../shared/services/todo-api/todo-api.service";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {ScrollingModule} from "@angular/cdk/scrolling";

xdescribe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService;

  beforeEach(async () => {
    mockTodoService = jasmine.createSpyObj('TodoApiService', ['getTodoList'])
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      imports: [
        NgxSkeletonLoaderModule,
        ScrollingModule,
      ],
      providers: [{
        provide: TodoApiService, useValue: mockTodoService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
