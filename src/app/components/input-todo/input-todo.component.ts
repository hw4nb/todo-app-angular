import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-input-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input-todo.component.html',
})
export class InputTodoComponent {
  private _todoService = inject(TodoService);

  public text: FormControl<string> = new FormControl('', { nonNullable: true });

  public onAddTodo() {
    const { value } = this.text;

    if (value.length <= 2) return;

    this._todoService.addTodo(value);

    this.text.reset('');
  }
}
