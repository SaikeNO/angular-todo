import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoneComponent } from './undone.component';
import { TasksService } from '../../tasks.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PrimeNgModule } from '../../prime-ng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UndoneComponent', () => {
  let component: UndoneComponent;
  let fixture: ComponentFixture<UndoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UndoneComponent],
      providers: [TasksService, HttpClient, HttpHandler],
      imports:[PrimeNgModule, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(UndoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
