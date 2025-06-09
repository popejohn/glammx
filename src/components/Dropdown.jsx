import React from "react";
import "../DropdownMenu.css"
import { FaAngleDown } from "react-icons/fa";
import "../glow.css"
import { Link } from "react-router-dom";


const DropdownMenu = ({products}) => {

  return (
    <div className="dropdown-wrapper" tabIndex={0}>
      <div className="glow dropdown-trigger bg-transparent text-dark d-flex justify-content-start align-items-center gap-2 fw-semibold">Categories <FaAngleDown  className=''/></div>
      <div className="dropdown-content py-4">
        {Object.keys(products).map((cat, index) => (
          <Link key={index} to = {`/user/account/products/${cat}`} className="dropdown-item px-3 text-muted">
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
