import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/authentication/user';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent Unit Tests', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{
        provide: AuthenticationService, useValue: { user: new BehaviorSubject<User>({ username: 'myusername', name: 'myname' }) }
      }],
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('on creating component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have function loadData', () => {
      expect(component.loadData).toBeDefined();
    });

    it('should call loadData on Init Lifecycle', fakeAsync(() => {
      spyOn(component, 'loadData');
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.loadData).toHaveBeenCalled();
    }));
  });

  describe('loadData function', () => {
    it('should call loadData on Init Lifecycle', fakeAsync(() => {
      spyOn(component, 'loadData');
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.loadData).toHaveBeenCalled();
    }));
  });
});
