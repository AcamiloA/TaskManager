import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Titulo', 'Descripcion', 'Estado', 'Acciones'];
  dataSource: Task[] = []; 

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.dataSource = tasks;
    });
  }

  createTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  editTask(taskId: number): void {
    this.router.navigate(['/tasks', taskId]);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks(); // Reload tasks after deletion
    });
  }
}
