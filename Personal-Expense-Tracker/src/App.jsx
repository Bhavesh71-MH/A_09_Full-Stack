
import { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  function addExpense(e) {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0 || !date) {
      alert("Please enter valid expense details.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    };

    const updatedExpenses = [...expenses, newExpense];

    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);
  }

  function deleteExpense(id) {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  }

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] =
      (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Expense Tracker</h1>
          <p>Track your money. Manage it better.</p>
        </div>
        <span className="wallet">💰</span>
      </header>

      <section className="summary">
        <div className="summary-card total-card">
          <p>Total Expenses</p>
          <h2>₹{total.toLocaleString("en-IN")}</h2>
          <span>{expenses.length} transactions recorded</span>
        </div>

        <div className="summary-card">
          <p>Categories Used</p>
          <h2>{Object.keys(categoryTotals).length}</h2>
          <span>Expense categories</span>
        </div>
      </section>

      <main className="content">
        <section className="panel">
          <h2>Add New Expense</h2>

          <form onSubmit={addExpense}>
            <label>Expense Name</label>
            <input
              type="text"
              placeholder="e.g. Lunch, Bus ticket"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Amount (₹)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Food</option>
              <option>Travel</option>
              <option>Education</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Other</option>
            </select>

            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <button type="submit">+ Add Expense</button>
          </form>
        </section>

        <section className="panel">
          <h2>Expense Analysis</h2>

          {Object.keys(categoryTotals).length === 0 ? (
            <p className="empty">Add expenses to see your analysis.</p>
          ) : (
            Object.entries(categoryTotals).map(([name, value]) => (
              <div className="category-item" key={name}>
                <div className="category-heading">
                  <span>{name}</span>
                  <strong>₹{value.toLocaleString("en-IN")}</strong>
                </div>
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${(value / total) * 100}%` }}
                  />
                </div>
                <small>{((value / total) * 100).toFixed(1)}% of expenses</small>
              </div>
            ))
          )}
        </section>
      </main>

      <section className="panel transactions">
        <h2>Recent Expenses</h2>

        {expenses.length === 0 ? (
          <p className="empty">No expenses yet. Add your first expense!</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[...expenses].sort((a, b) => b.id - a.id).map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.title}</td>
                    <td><span className="category-tag">{expense.category}</span></td>
                    <td>{expense.date}</td>
                    <td>₹{expense.amount.toLocaleString("en-IN")}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteExpense(expense.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer>Personal Expense Tracker · Built with React</footer>
    </div>
  );
}

export default App;
