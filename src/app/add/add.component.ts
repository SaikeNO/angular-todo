import { Component } from '@angular/core';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  title: string = "";

  onSubmit():void{
    //this.tasksService.addTask(this.title, "ss", new Date()).subscribe();
  }
}
