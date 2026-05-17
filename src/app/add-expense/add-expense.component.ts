import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html'
})
export class AddExpenseComponent {

  expense = {
    name: '',
    amount: 0,
    category: '',
    date: '',
    userId: 0
  };

  constructor(
    private service: ExpenseService,
    private router: Router,
    private authService: AuthService
  ) { }

  addExpense() {

    // Get logged-in user
    const user = this.authService.getUser();

    // Assign USER_ID
    this.expense.userId = user.userId;
    this.expense.date = new Date().toISOString();

    this.service.addExpense(this.expense).subscribe(res => {

      Swal.fire({
        icon: 'success',
        title: 'Expense Added!',
        text: 'Saved successfully',
        timer: 1500,
        showConfirmButton: false
      });

      // Clear form
      this.expense = {
        name: '',
        amount: 0,
        category: '',
        date: '',
        userId: 0
      };

      // Redirect
     

    });
  }
}
