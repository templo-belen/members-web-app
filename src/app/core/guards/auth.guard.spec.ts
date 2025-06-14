import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserService } from '../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let router: Router;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: UserService, useValue: userServiceSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should return true if authenticated', () => {
    userServiceSpy.isAuthenticated.and.returnValue(true);
    const result = guard.canActivate(mockRoute, mockState);
    expect(result).toBeTrue();
  });

  it('should return UrlTree redirect if not authenticated', () => {
    userServiceSpy.isAuthenticated.and.returnValue(false);
    const expectedUrlTree = router.parseUrl('/login');
    const result = guard.canActivate(mockRoute, mockState);
    expect(result).toEqual(expectedUrlTree);
  });
});
