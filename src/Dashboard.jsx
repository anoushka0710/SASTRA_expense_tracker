import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Chatbot from "./Chatbot";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("allExpenses")) || [];
    setExpenses(storedExpenses);

    const today = new Date().toLocaleDateString("en-CA");
    const month = today.slice(0, 7);

    const todayFiltered = storedExpenses.filter((exp) => exp.date === today);
    setTodayTotal(
      todayFiltered.reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
    );

    const monthFiltered = storedExpenses.filter((exp) =>
      exp.date.startsWith(month)
    );
    setMonthTotal(
      monthFiltered.reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
    );

    const categoryTotals = {};
    storedExpenses.forEach((exp) => {
      const category = exp.category || "general";
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += parseFloat(exp.amount);
    });
    setCategoryTotals(categoryTotals);
  }, []);

  const today = new Date().toLocaleDateString("en-CA");
  const month = today.slice(0, 7);

  const pieData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  return (
    <>
      <div>
        <h1 className="page-title">Dashboard</h1>

        {/* Summary Cards */}
        <div className="summary-container">
          <div className="summary-card">
            <div className="total-line">
              <span>Today's Total:</span>
              <strong>₹{todayTotal}</strong>
            </div>
            <div className="date-line">{today}</div>
            <div className="section-title">Today's Expenses</div>
            <ul className="today-list">
              {expenses.filter((exp) => exp.date === today).length > 0 ? (
                expenses
                  .filter((exp) => exp.date === today)
                  .map((exp, i) => (
                    <li key={i}>
                      <span className="amount">₹{exp.amount}</span>
                      <span className="dash">–</span>
                      <span className="note">{exp.note}</span>
                    </li>
                  ))
              ) : (
                <p className="empty">No expenses today</p>
              )}
            </ul>
          </div>

          <div className="summary-card">
            <div className="total-line">
              <span>Monthly Total:</span>
              <strong>₹{monthTotal}</strong>
            </div>
            <div className="date-line">{month}</div>
            <div className="section-title">This Month's Expenses</div>
            <ul className="today-list">
              {expenses.filter((exp) => exp.date.startsWith(month)).length > 0 ? (
                expenses
                  .filter((exp) => exp.date.startsWith(month))
                  .map((exp, i) => (
                    <li key={i}>
                      <span className="amount">₹{exp.amount}</span>
                      <span className="dash">–</span>
                      <span className="note">{exp.note}</span>
                    </li>
                  ))
              ) : (
                <p className="empty">No expenses this month</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Chatbot Section */}
      <Chatbot today={todayTotal} monthly={monthTotal} />

      {/* Pie Chart Section */}
      <div className="pie-section">
        <h3>Expenses by Category</h3>
        {pieData.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>No category data to display</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
