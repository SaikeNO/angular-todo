import { Component } from '@angular/core';
import { Message } from 'src/app/shared/message/message';
import { UnDoneStore } from './undone.store';
@Component({
  selector: 'app-undone',
  templateUrl: './undone.component.html',
  styleUrls: ['./undone.component.scss'],
  providers: [UnDoneStore]
})
export class UndoneComponent extends Message{
  unDoneDictionaries$ = this.store.unDoneDictionaries$;

  constructor(private store: UnDoneStore) {
    super();
    this.store.getUnDoneDictionaries({});
  }

  onDoneClick(id: string): void {
    this.store.doneTask(id);
  }
}
