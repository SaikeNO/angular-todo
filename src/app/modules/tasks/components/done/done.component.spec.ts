import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneComponent } from './done.component';
import { TasksService } from '../../tasks.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PrimeNgModule } from '../../prime-ng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DoneComponent', () => {
  let component: DoneComponent;
  let fixture: ComponentFixture<DoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoneComponent],
      providers: [TasksService, HttpClient, HttpHandler],
      imports: [PrimeNgModule, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(DoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
