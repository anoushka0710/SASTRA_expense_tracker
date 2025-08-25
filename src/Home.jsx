import "./Home.css"
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); //hook

  return (
    <div className="App">
      <header className="header">
        <h1 className="Heading">Sastra Expenses</h1>

        <div className="header-buttons">
          <button className="header-btn" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button className="header-btn" onClick={() => navigate("/add-expense")}>
            Add Expense
          </button>
        </div>
      </header>

      <section className="hero">
        <h1>Track today, secure Tomorrow</h1>
      </section>

      <section className="about">
        <h2>About this site</h2>
        <p>
         <b>This Expense Tracker helps you stay on top of your spending by recording daily and monthly expenses. You can organize your expenses into categories like Canteen, Travel, and more. The site also features a chatbot for quick assistance and a pie chart to give you clear visual insights into your spending habits.</b>
        </p>
        <button
          className="header-btn ab-btn"
          onClick={() => navigate("/add-expense")}
        >
          Add Expense
        </button>
      </section>
    </div>
  );
}

export default Home;