import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/authentication/user';

describe('AuthenticationService Unit Tests', () => {
  let service: AuthenticationService;

  beforeEach(() =>  {
    TestBed.configureTestingModule({});

    service = TestBed.get(AuthenticationService);
  });

  describe('initial state', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have a user public property', () => {
      expect(service.user).toBeDefined();
    });

    it('should have user as an instance of BehaviourSubject', () => {
      expect(service.user instanceof BehaviorSubject).toBeTruthy();
    });

    it('should have a public method login', () => {
      expect(service.login).toBeDefined();
    });
  });

  describe('login method', () => {
    it('should return Observable true when username and password are filled', () => {
      service.login('myusername', 'mypassword').subscribe(result => {
        expect(result).toBeTruthy();
      });
    });

    it('should return Observable false when password is missing', () => {
      service.login('myusername', '').subscribe(result => {
        expect(result).toBeFalsy();
      });
    });

    it('should return Observable false when username is missing', () => {
      service.login('', 'mypassword').subscribe(result => {
        expect(result).toBeFalsy();
      });
    });

    it('should set user property with username and name', () => {
      service.login('myusername', 'mypassword').subscribe(() => {
        service.user.subscribe(user => {
          expect(user.username).toBe('myusername');
          expect(user.name).toBe('myusername');
        });
      });
    });
  });
});
