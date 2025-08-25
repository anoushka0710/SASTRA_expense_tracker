import { Link } from "react-router-dom";
import "./Add_exp.css";

function Add_exp({ title, category }) {
  return (
    <Link to={`/category/${category}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default Add_exp;
