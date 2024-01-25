import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
];
