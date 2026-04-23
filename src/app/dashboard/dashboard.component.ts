import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  expenses: any;
  summary: any;
  selectedExpense: any = null; // ✅ needed

  constructor(private service: ExpenseService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getExpenses().subscribe(res => {
      this.expenses = res;
    });

    this.service.getSummary().subscribe(res => {
      this.summary = res;
    });
  }

  budgetInput: number = 0;

  setBudget() {
    this.service.setBudget({ totalBudget: this.budgetInput }).subscribe(res => {
     Swal.fire({
  icon: 'success',
  title: 'Budget Saved',
  timer: 1500,
  showConfirmButton: false
});
      this.loadData();
    });
  }

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

  // ✅ EDIT METHOD (INSIDE CLASS)
  editExpense(exp: any) {
    this.selectedExpense = { ...exp };
  }

  // ✅ UPDATE METHOD (INSIDE CLASS)
  updateExpense() {
    this.service.updateExpense(this.selectedExpense.id, this.selectedExpense)
      .subscribe(res => {
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