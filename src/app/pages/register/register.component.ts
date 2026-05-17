import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  registerData = {
    name: '',
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register() {

    this.authService.register(this.registerData)
      .subscribe({

        next: (res: any) => {

          this.router.navigate(['/login']);

        },

        error: (err) => {

          /*alert(err.error.message);*/
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: err.error.message
          });
        }

      });

  }

}
