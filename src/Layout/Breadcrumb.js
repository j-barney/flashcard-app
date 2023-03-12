import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ link, linkName, name }) {
  if (!link) {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">⌂ Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
          {name}
          </li>
        </ol>
      </nav>
    );
  }
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb ">
        <li className="breadcrumb-item">
          <Link to="/">⌂ Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={link}>{linkName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {name}
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
