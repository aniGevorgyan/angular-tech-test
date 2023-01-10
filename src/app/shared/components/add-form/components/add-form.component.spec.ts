import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormComponent } from './add-form.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { TodoApiService } from 'src/app/shared/services/todo-api/todo-api.service';

describe('AddFormComponent', () => {
  let component: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;
  let mockTodoService;

  beforeEach(async () => {
    mockTodoService = jasmine.createSpyObj('TodoApiService', ['deleteTodo'])
    await TestBed.configureTestingModule({
      declarations: [ AddFormComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: TodoApiService,
          useValue: mockTodoService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate form group', () => {
    expect(component.addForm).toBeTruthy();
    expect(component.addForm.get('description')).toBeTruthy();
    expect(component.addForm.get('label')).toBeTruthy();
    expect(component.addForm.get('category')).toBeTruthy();
  })

  it('should turn into update mode, when default value provided', async () => {
    fixture.componentInstance.defaultData = {
      description: 'mockDescription',
      label: 'mockLabel',
      category: 'mockCategory'
    }
    fixture.componentInstance.ngOnChanges();
    expect(fixture.componentInstance.addForm.get('description').value).toBe('mockDescription');
    expect(fixture.componentInstance.addForm.get('label').value).toBe('mockLabel');
    expect(fixture.componentInstance.addForm.get('category').value).toBe('mockCategory');
  })
});
