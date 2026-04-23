import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html'
})
export class AddExpenseComponent {

  expense = {
    name: '',
    amount: 0,
    category: '',
    date: ''
  };

  constructor(private service: ExpenseService, private router: Router) {}

  addExpense() {
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
        date: ''
      };

      // Redirect
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);

    });
  }
}