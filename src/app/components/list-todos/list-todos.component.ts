import { CommonModule } from '@angular/common'
import { Component, effect, inject } from '@angular/core'
import { InputTodoComponent } from 'src/app/components/input-todo/input-todo.component'
import { TodoComponent } from 'src/app/components/todo/todo.component'
import { Todo, TodoService } from 'src/app/services/todo.service'

@Component({
  selector: 'app-list-todos',
  standalone: true,
  imports: [CommonModule, TodoComponent, InputTodoComponent],
  templateUrl: './list-todos.component.html'
})
export class ListTodosComponent {
  private _todoService = inject(TodoService)

  public todos: Todo[] = []

  get pendingTodos() {
    return this.todos.filter((todo) => todo.status === 'pending')
  }

  constructor() {
    effect(() => {
      this.todos = this._todoService.getTodos()
    })
  }

  public onDeleteAllTodos() {
    if (!confirm(`Are you sure you want to delete all tasks?`)) return
    this._todoService.deleteAllTodos()
  }
}
