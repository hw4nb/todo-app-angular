import { Injectable, effect, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';

type Status = 'pending' | 'done';

export interface Todo {
  id: string;
  text: string;
  status: Status;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos = signal<Todo[]>([]);

  get getTodos() {
    return this.todos;
  }

  constructor() {
    this.getTodosFromLocalStorage();

    effect(() => {
      this.updateLocalStorage(this.todos());
    });
  }

  private getTodosFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (!storedTodos) return;
    this.todos.set(JSON.parse(storedTodos));
  }

  private updateLocalStorage(updateTodos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(updateTodos));
  }

  public addTodo(text: string) {
    this.todos.set([{ id: uuid(), text, status: 'pending' }, ...this.todos()]);
  }

  public checkTodo(id: string, checked: boolean) {
    const todoToUpdate = this.todos().find((todo) => todo.id === id);
    const updatedTodos = this.todos().filter((todo) => todo.id !== id);

    if (!todoToUpdate) return;

    if (checked) {
      updatedTodos.push({ ...todoToUpdate, status: 'done' });
    } else {
      updatedTodos.unshift({ ...todoToUpdate, status: 'pending' });
    }

    this.todos.set([...updatedTodos]);
  }

  public deleteTodo(id: string) {
    this.todos.set([...this.todos().filter((todo) => todo.id !== id)]);
  }

  public deleteAllTodos() {
    this.todos.set([]);
    localStorage.clear();
  }
}
