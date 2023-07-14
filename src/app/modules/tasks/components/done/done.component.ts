import { Component } from '@angular/core';
import { DoneStore } from './done.store';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
  providers: [DoneStore],
})
export class DoneComponent {
  vm$ = this.store.vm$;

  constructor(private store: DoneStore) {
    this.store.getDoneDictionaries();
  }

  onDeleteClick(id: string): void {
    this.store.removeTask(id);
  }
}
