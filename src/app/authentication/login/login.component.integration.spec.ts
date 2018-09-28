import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../authentication.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

describe('LoginComponent Integration Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitButtonElement: DebugElement; // Use DebugElement as it platform agnostic
  let cancelButtonElement: DebugElement;
  let usernameInputElement: DebugElement;
  let passwordInputElement: DebugElement;
  let loadingDivElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([{ path: 'home', children: [] }])],
      declarations: [LoginComponent],
      providers: [AuthenticationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    submitButtonElement = fixture.debugElement.query(By.css('#buttonSubmit')); // Identify elements easily
    cancelButtonElement = fixture.debugElement.query(By.css('#buttonCancel'));
    usernameInputElement = fixture.debugElement.query(By.css('#inputUsername'));
    passwordInputElement = fixture.debugElement.query(By.css('#inputPassword'));
    loadingDivElement = fixture.debugElement.query(By.css('#divLoading'));
  });

  describe('when interacting', () => {
    it('should have a login div visible when loading is true', fakeAsync(() => {
      component.loading = true;
      fixture.detectChanges();
      expect(loadingDivElement.nativeElement.hasAttribute('hidden')).toBeFalsy();
    }));

    it('should have a login div visible when loading is false', fakeAsync(() => {
      component.loading = false;
      fixture.detectChanges();
      expect(loadingDivElement.nativeElement.hasAttribute('hidden')).toBeTruthy();
    }));
  });

  describe('when filling the form', () => {
    it('should have a input username binded with username control', fakeAsync(() => {
      component.loginForm.controls['username'].setValue('myusername');
      fixture.detectChanges();
      expect(usernameInputElement.nativeElement.value).toBe('myusername');
    }));

    it('should have a input password binded with password control', fakeAsync(() => {
      component.loginForm.controls['password'].setValue('mypassword');
      fixture.detectChanges();
      expect(passwordInputElement.nativeElement.value).toBe('mypassword');
    }));

    it('should have a login button enabled when loginForm is valid', fakeAsync(() => {
      component.loginForm.setValue({ username: 'test', password: 'test' });
      fixture.detectChanges();
      expect(submitButtonElement.nativeElement.hasAttribute('disabled')).toBeFalsy();
    }));

    it('should have a login button disabled when loginForm is invalid', fakeAsync(() => {
      component.loginForm.setValue({ username: 'test', password: '' });
      fixture.detectChanges();
      expect(submitButtonElement.nativeElement.hasAttribute('disabled')).toBeTruthy();
    }));
  });

  describe('when submit', () => {
    it('should submit the user input to login when click submit button', fakeAsync(inject([AuthenticationService], (authService) => {
      component.loginForm.setValue({ username: 'myusername', password: 'mypassword' });
      fixture.detectChanges();
      // Do watch for methods that are being tested without mocking them
      spyOn(component, 'onSubmit').and.callThrough();
      spyOn(authService, 'login').and.callThrough();

      submitButtonElement.nativeElement.click();

      fixture.whenStable().then(() => {
        expect(component.onSubmit).toHaveBeenCalled();
        expect(authService.login).toHaveBeenCalledWith('myusername', 'mypassword');
      });
    })));
  });
});

