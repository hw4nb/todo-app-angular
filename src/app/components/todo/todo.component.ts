import { CommonModule } from '@angular/common'
import { Component, Input, inject } from '@angular/core'
import { Todo, TodoService } from 'src/app/services/todo.service'

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html'
})
export class TodoComponent {
  private _todoService = inject(TodoService)

  @Input() todo: Todo = { id: '', text: '', status: 'pending' }

  public onCheckTodo({ target }: Event) {
    const isChecked = (<HTMLInputElement>target).checked
    this._todoService.checkTodo(this.todo.id, isChecked)
  }

  public onDeleteTodo() {
    if (
      !confirm(`Are you sure you want to delete the task: ${this.todo.text}?`)
    ) {
      return
    }

    this._todoService.deleteTodo(this.todo.id)
  }
}
