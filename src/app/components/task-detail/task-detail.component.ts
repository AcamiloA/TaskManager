import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task!: Task; 

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTask(id);
  }

  getTask(id: number): void {
    this.taskService.getTask(id).subscribe((task) => {
      this.task = task;
    });
  }

  editTask(taskId: number): void {
    this.router.navigate(['/tasks/edit', taskId]);
  }
  
  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.router.navigate(['/task-board']);
    });
  }

  goBack(): void {
    this.router.navigate(['/task-board']); 
  }
}
