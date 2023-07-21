import { Task } from 'src/types/task';
import { TasksService } from './tasks.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.development';
import { HttpErrorResponse } from '@angular/common/http';

const tasks: Task[] = [
  {
    _id: '64ba4656c632b703e830df5f',
    title: 'Test',
    description: 'Testowy',
    date: new Date(),
    isDone: false,
  },
  {
    _id: '64ba4656c632b703e830df5e',
    title: 'Test2',
    description: 'Testowy2',
    date: new Date(),
    isDone: true,
  },
];

describe('TasksService', () => {
  let tasksService: TasksService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });

    tasksService = TestBed.inject(TasksService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('returns the tasks', () => {
    let tasksList: Task[] | undefined;
    tasksService.getTasks().subscribe((data) => (tasksList = data));

    const request = controller.expectOne(environment.apiUrl);
    request.flush(tasks);
    controller.verify();
    expect(tasksList).toEqual(tasks);
  });

//   it('returns tasks errors', () => {
//     const errorStr = "Error: Bad Request";
  
//     tasksService.getTasks().subscribe({
//         next: () => {
//             fail('next handler must not be called');
//         },
//         error: (error) => {
//             expect(error).toEqual(errorStr);
//         },
//     }
//     );
  
//     controller.expectOne(environment.apiUrl).flush(errorStr, { status: 400, statusText: "Bad Request" });
//   });

  afterEach(() => {
    controller.verify();
  });
});
