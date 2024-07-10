import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from './auth.reducer';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);
  return store.select(authFeature.selectIsAuthenticated).pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        // Optionally redirect to login page or show a login prompt
        const snackBarRef = snackBar.open('You need to log in to access this page.', 'Login', {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "top",
        });

        snackBarRef.onAction().subscribe(() => {
          router.navigate(['/login']);
        });
         
        return false;
      }
      return true;
    })
  );
};
