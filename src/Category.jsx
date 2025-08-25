import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [expenses, setExpenses] = useState([
    { id: 1, amount: '', note: '', date: new Date().toLocaleDateString("en-CA"), category: category } // auto-fill today's date and category
  ]);

  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    const updatedExpenses = expenses.map(expense =>
      expense.id === id ? { ...expense, [name]: value } : expense
    );
    setExpenses(updatedExpenses);
  };

  const handleAddMore = () => {
    const newId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;
    setExpenses([
      ...expenses,
      { id: newId, amount: '', note: '', date: new Date().toLocaleDateString("en-CA"), category: category }
    ]);
  };

  const handleDone = () => {

    const hasEmptyFields = expenses.some(
      exp => !exp.amount || !exp.note.trim() || !exp.date
    );
    if (hasEmptyFields) {
      alert("⚠ Please fill in Amount, Note, and Date for all expenses before submitting.");
      return;
    }

  
    const existingExpenses = JSON.parse(localStorage.getItem("allExpenses")) || [];
    const updatedExpenses = [...existingExpenses, ...expenses];
    localStorage.setItem("allExpenses", JSON.stringify(updatedExpenses));

    console.log("Final Expenses:", updatedExpenses);
    alert(" Expenses submitted successfully!");
  };

  return (
    <>
      <div className="expense-container">
        <h2 className="title">Expense Tracker - {category.toUpperCase()}</h2>
        {expenses.map(expense => (
          <div key={expense.id} className="expense-entry">
            <div className="form-group">
              <label>Amount</label>
              <input
                className='Placeh'
                type="number"
                name="amount"
                value={expense.amount}
                onChange={e => handleInputChange(expense.id, e)}
                placeholder="Enter amount"
              />
            </div>
            <div className="form-group">
              <label>Note</label>
              <input
                className='Placeh'
                type="text"
                name="note"
                value={expense.note}
                onChange={e => handleInputChange(expense.id, e)}
                placeholder="Enter note"
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                className='Placeh'
                type="date"
                name="date"
                value={expense.date}
                onChange={e => handleInputChange(expense.id, e)}
              />
            </div>
          </div>
        ))}
        <div className="button-group">
          <button className="add-more-btn" onClick={handleAddMore}>Add More</button>
          <button className="done-btn" onClick={handleDone}>Done</button>
        </div>
      </div>

      <button onClick={() => navigate("/dashboard")} className="dashboard-button">
        Go to Dashboard
      </button>
    </>
  );
};

export default Category;