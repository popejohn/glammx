import { MdHealthAndSafety, MdSportsBaseball, MdOutlineComputer } from "react-icons/md";
import { FaTshirt } from "react-icons/fa";
import { GiHighHeel } from "react-icons/gi";
import { PiSneaker } from "react-icons/pi";
import { CiHeadphones } from "react-icons/ci";
import { Link } from "react-router-dom";
import '../categories.css'
import '../App.css'


  
  const CategoryIcons = () => {
    const categories = [
      { name: 'Health and Beauty', icon: <MdHealthAndSafety /> },
      { name: 'Fashion', icon: <FaTshirt /> },
      { name: 'Sport', icon: <MdSportsBaseball /> },
      { name: 'Computing', icon: <MdOutlineComputer /> },
      { name: 'Sneakers', icon: <PiSneaker /> },
      { name: 'Shoes', icon: <GiHighHeel /> },
      { name: 'Phones', icon: <CiHeadphones /> }
    ];
  
    return (
      <div className="category-icons-container">
        {categories.map(({name, icon}, i) => (
          <Link to={`/user/account/products/${name}`} className="navlinks text-decoration-none text-dark category-box d-flex justify-content-center align-items-center gap-2 fs-3" key={i}>
            {icon}
            <div className="fs-6 fw-semibold">{name}</div>
          </Link>
        ))}
      </div>
    );
  };
   
  export default CategoryIcons;
  