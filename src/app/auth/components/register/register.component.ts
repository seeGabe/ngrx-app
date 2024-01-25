import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { ErrorMessages } from 'src/app/shared/components/errorMessages/errorMessages.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ErrorMessages],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  store = inject(Store);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    username: ['', Validators.required],
  });
  // isSubmitting$ = this.store.select(selectIsSubmitting);
  // backendErrors$ = this.store.select(selectValidationErrors);
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  onSubmit2(): void {
    console.log('form', this.form.getRawValue());

    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
  }

  // onSubmit(): void {
  //   this.http
  //     .post('https://api.realworld.io/api/users', {
  //       user: this.form.getRawValue(),
  //     })
  //     .subscribe((response: any) => {
  //       console.log('registrate', response);
  //       localStorage.setItem('token', response.user.token);
  //       this.authService.currentUserSignal.set(response.user);
  //       this.router.navigateByUrl('/');
  //     });
  // }
}
