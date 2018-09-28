import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { User } from 'src/app/authentication/user';

describe('HomeComponent', () => {
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

  describe('user async pipe', () => {
    it('should retrieve user from AuthService', fakeAsync(inject([AuthenticationService], (authService) => {
      authService.user.next({ username: 'myusername', name: 'myname' });
      fixture.detectChanges();
      const labelUser = fixture.debugElement.query(By.css('#labelUser'));
      expect(labelUser.nativeElement.innerHTML).toBe('Hello: myname!');
    })));

    it('should retrieve user from AuthService', fakeAsync(inject([AuthenticationService], (authService) => {
      fixture.detectChanges();
      const labelUser = fixture.debugElement.query(By.css('#labelUser'));
      expect(labelUser.nativeElement.innerHTML).toBe('Viewing as anonymous!');
    })));
  });
});
