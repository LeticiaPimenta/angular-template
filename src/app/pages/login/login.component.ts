import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { State, Store } from '@ngrx/store';
import { AuthService } from '../../shared/services/auth.service';
import { Route, Router } from '@angular/router';
import { noop, tap } from 'rxjs';
import { AuthState } from '../../state/reducers/auth.reducer';
import { login } from '../../state/actions/auth.actions';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.loginForm = this.fb.group({
      email: ['teste@email', [Validators.required]],
      password: ['123', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      console.log('Login com email:', email, 'Senha:', password)
      this.auth.login(email, password)
      .pipe(
        tap(user => {
          console.log(user);
          this.store.dispatch(login({ user }));
          this.router.navigateByUrl('/home');
        })
      )
      .subscribe(
        noop,
        () => alert('Login Failed')
      );
    }
  }

}
