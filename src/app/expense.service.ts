import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = 'https://localhost:7291/api/expense';

  constructor(private http: HttpClient) { }

  // GET expenses
  getExpenses() {
    return this.http.get(this.baseUrl + '/list');
  }

  // POST add expense
  addExpense(data: any) {
    return this.http.post(this.baseUrl + '/add', data);
  }

  // GET summary
  getSummary() {
    return this.http.get(this.baseUrl + '/summary');
  }

setBudget(data: any) {
  return this.http.post(this.baseUrl + '/set-budget', data);
}
deleteExpense(id: number) {
  return this.http.delete(this.baseUrl + '/delete/' + id);
}
updateExpense(id: number, data: any) {
  return this.http.put(this.baseUrl + '/update/' + id, data);
}
}