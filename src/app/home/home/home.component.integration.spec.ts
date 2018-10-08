import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { User } from 'src/app/authentication/user';

describe('HomeComponent Integration Tests', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [HomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('loadData', () => {
    it('should set user from AuthService', inject([AuthenticationService], (authService) => {
      const defaultUser = { username: 'myusername', name: 'myname' };
      authService.user.next(defaultUser);
      component.loadData();
      expect(component.user).toBe(defaultUser);
    }));
  });

  describe('UserName field', () => {
    it('should bind User property from AuthService and display its Name', fakeAsync(inject([AuthenticationService], (authService) => {
      authService.user.next({ username: 'myusername', name: 'myname' });
      fixture.detectChanges();
      const labelUser = fixture.debugElement.query(By.css('#labelUser'));
      expect(labelUser.nativeElement.innerHTML).toBe('Hello: myname!');
    })));

    it('should show as Anonymous when user is not authenticated', fakeAsync(inject([AuthenticationService], (authService) => {
      fixture.detectChanges();
      const labelUser = fixture.debugElement.query(By.css('#labelUser'));
      expect(labelUser.nativeElement.innerHTML).toBe('Viewing as anonymous!');
    })));
  });
});
