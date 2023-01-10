import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoElementComponent } from './todo-element.component';
import {TodoApiService} from "../../../shared/services/todo-api/todo-api.service";

describe('TodoElementComponent', () => {
  let component: TodoElementComponent;
  let fixture: ComponentFixture<TodoElementComponent>;
  let mockTodoService;

  beforeEach(async () => {
    mockTodoService = jasmine.createSpyObj('TodoApiService', ['deleteTodo'])
    await TestBed.configureTestingModule({
      declarations: [ TodoElementComponent ],
      providers: [{
        provide: TodoApiService, useValue: mockTodoService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoElementComponent);
    component = fixture.componentInstance;
    component.data = {category: "", description: "", done: false, label: "", id: 444}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have property "deleted" with default value', () => {
    expect(component.updateFormShown).toBe(false);
  });

  it('should call API request, when clicked "Delete" button', () => {
    spyOn(component, 'deleteTask');

    const deleteButton = fixture.debugElement.nativeElement.querySelector(".todo__action_delete");
    deleteButton.click();

    expect(component.deleteTask).toHaveBeenCalled();
  });
});
