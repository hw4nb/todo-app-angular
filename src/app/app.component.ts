import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListTodosComponent } from 'src/app/components/list-todos/list-todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ListTodosComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
