import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../authentication.service';
import { defer, Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/authentication/user';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { userInfo } from 'os';

class MockAuthService {
  public user = new BehaviorSubject<User>(<User>{});

  login(username: string, password: string): Observable<boolean> {
    return defer(() => Promise.resolve(Boolean(username && password)));
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([{ path: 'home', children: [] }])], // Only imports Lib Modules
      providers: [{ provide: AuthenticationService, useClass: MockAuthService }], // Aways use mock for services
      declarations: [LoginComponent], // Declare just the component that's been tested
      schemas: [NO_ERRORS_SCHEMA] // Hide template errors on Unit tests only
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('on form creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have a loginForm with username and password controls', () => {
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm.controls['username']).toBeDefined();
      expect(component.loginForm.controls['password']).toBeDefined();
    });

    it('should start with username and password controls with string empty', () => {
      expect(component.loginForm.value.username).toBe('');
      expect(component.loginForm.value.password).toBe('');
    });

    it('login form invalid when empty', () => {
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should have loading property false', () => {
      expect(component.loading).toBeFalsy();
    });
  });

  describe('when filling the form', () => {
    it('should have form invalid when username only', () => {
      component.loginForm.controls['username'].setValue('teste');
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should have form invalid when password only', () => {
      component.loginForm.controls['password'].setValue('teste');
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should have form valid with username and password', () => {
       // Do prefer use setValue instead of patchValue, as it can catch extra components errors
      component.loginForm.setValue({ username: 'test', password: 'test' });
      expect(component.loginForm.valid).toBeTruthy();
    });
  });

  describe('on submit form', () => {
    it('should set loading to true before the request is made', fakeAsync(() => {
      component.onSubmit();
      expect(component.loading).toBeTruthy();
    }));

    it('should set loading to false after the request is done', fakeAsync(() => {
      component.onSubmit();
      tick();
      expect(component.loading).toBeFalsy();
    }));

    it('should navigate to /home if success', fakeAsync(inject([Location], (location) => {
      component.loginForm.setValue({ username: 'test', password: 'test' });
      component.onSubmit();
      tick();
      expect(location.path()).toBe('/home');
    })));

    it('should stay in Login Component if error', fakeAsync(inject([Location], (location) => {
      component.loginForm.setValue({ username: 'test', password: '' });
      component.onSubmit();
      tick();
      expect(location.path()).toBe('');
    })));
  });
});
