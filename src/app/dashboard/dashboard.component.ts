import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  expenses: any;
  summary: any;
  selectedExpense: any = null;

  user: any;

  budgetInput: number = 0;

  constructor(
    private service: ExpenseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadData();
  }

  // ---------------- LOAD USER DATA ----------------
  loadData() {

    const userId = this.user.userId;

    this.service.getExpenses(userId).subscribe(res => {
      this.expenses = res;
    });

    this.service.getSummary(userId).subscribe(res => {
      this.summary = res;
    });
  }

  // ---------------- SET BUDGET ----------------
  setBudget() {

    const userId = this.user.userId;

    this.service.setBudget({
      userId: userId,
      totalBudget: this.budgetInput
    }).subscribe(res => {

      Swal.fire({
        icon: 'success',
        title: 'Budget Saved',
        timer: 1500,
        showConfirmButton: false
      });

      this.loadData();
    });
  }

  // ---------------- DELETE EXPENSE ----------------
  deleteExpense(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the expense!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.service.deleteExpense(id).subscribe(res => {

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            timer: 1500,
            showConfirmButton: false
          });

          this.loadData();
        });
      }
    });
  }

  // ---------------- EDIT EXPENSE ----------------
  editExpense(exp: any) {

    this.selectedExpense = {
      ...exp,
      date: exp.date
        ? new Date(exp.date).toISOString().split('T')[0]
        : ''
    };
  }

  // ---------------- UPDATE EXPENSE ----------------
  updateExpense() {

    this.service.updateExpense(
      this.selectedExpense.id,
      this.selectedExpense
    ).subscribe(res => {

      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        timer: 1500,
        showConfirmButton: false
      });

      this.selectedExpense = null;
      this.loadData();
    });
  }
}
