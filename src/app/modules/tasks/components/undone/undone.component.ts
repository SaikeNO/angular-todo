import { Component } from '@angular/core';
import { UnDoneStore } from './undone.store';
@Component({
  selector: 'app-undone',
  templateUrl: './undone.component.html',
  styleUrls: ['./undone.component.scss'],
  providers: [UnDoneStore]
})
export class UndoneComponent{
  vm$ = this.store.vm$;

  constructor(private store: UnDoneStore) {
    this.store.getUnDoneDictionaries();
  }

  onDoneClick(id: string): void {
    this.store.doneTask(id);
  }
}
