import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = 'https://expense-backend-m5ff.onrender.com/api/expense';

  constructor(private http: HttpClient) { }

  // ---------------- GET EXPENSES (USER WISE) ----------------
  getExpenses(userId: number) {
    return this.http.get(
      `${this.baseUrl}/list/${userId}`
    );
  }

  // ---------------- ADD EXPENSE ----------------
  addExpense(data: any) {
    return this.http.post(
      `${this.baseUrl}/add`,
      data
    );
  }

  // ---------------- GET SUMMARY (USER WISE) ----------------
  getSummary(userId: number) {
    return this.http.get(
      `${this.baseUrl}/summary/${userId}`
    );
  }

  // ---------------- SET BUDGET (USER WISE) ----------------
  setBudget(data: any) {
    return this.http.post(
      `${this.baseUrl}/set-budget`,
      data
    );
  }

  // ---------------- DELETE EXPENSE ----------------
  deleteExpense(id: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/${id}`
    );
  }

  // ---------------- UPDATE EXPENSE ----------------
  updateExpense(id: number, data: any) {
    return this.http.put(
      `${this.baseUrl}/update/${id}`,
      data
    );
  }
}
