import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoApiService} from "../../../services/todo-api/todo-api.service";
import {TodoI} from "../../../interfaces/todo.interface";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent {
  @Input()
  public defaultData?: Partial<TodoI>;

  @Output()
  public cancelled: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public created: EventEmitter<TodoI> = new EventEmitter<TodoI>();

  @Output()
  public updated: EventEmitter<TodoI> = new EventEmitter<TodoI>();

  public addForm: FormGroup;

  private isUpdate: boolean = false;

  constructor(protected readonly formBuilder: FormBuilder, protected readonly todoApiService: TodoApiService, private readonly changeDetectorRef: ChangeDetectorRef) {
    this.addForm = formBuilder.group({
      description: formBuilder.control('', [Validators.required]),
      label: formBuilder.control('', [Validators.required]),
      category: formBuilder.control('', [Validators.required])
    })
  }

  public ngOnChanges(): void {
    if (this.defaultData) {
      this.addForm.patchValue({
        ...this.defaultData
      });
      this.isUpdate = true;
    }
  }

  public createNewTask(): void {
    if (this.addForm.valid) {
      if (this.isUpdate) {
        this.todoApiService.updateTodo(this.defaultData.id, {...this.addForm.value}).subscribe(
          (res) => {
            this.updated.emit(res);
          }
        )
      } else {
        this.todoApiService.createTodo({...this.addForm.value, done: false}).subscribe(
          (res) => {
            this.created.emit(res);
          }
        )
      }
    }
  }
}
