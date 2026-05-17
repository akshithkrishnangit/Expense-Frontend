import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {

    this.authService.login(this.loginObj)
      .subscribe({

        next: (res: any) => {
         

          if (res.success) {

            // Save logged user
            this.authService.saveUser(res);

            //Swal.fire({
            //  icon: 'success',
            //  title: 'Login Successful'
            //});

            // Redirect to dashboard
            this.router.navigate(['/dashboard']);
          }
        },

        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid Username or Password'
          });
        }
      });
  }
}
