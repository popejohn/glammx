import { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import '../searchbar.css'


const Searchbar = ({products, style, altProducts, setAllProducts, setAdvert}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('')

  const searchProducts = (e) => {
      setSearchInputValue(e.target.value)
      const searchProducts = altProducts.filter((product) => {
        return product.title.toLowerCase().includes(e.target.value.toLowerCase()) || product.category.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setAllProducts(searchProducts)
      if (Object.keys(products).length <= 3) {
    setAdvert(false)
  }else{
    setAdvert(true)
  }

  }
  
  
  return (
    <div className="search-category-bar" style={style}>
      <div className="search-container mx-5 py-2">
      <IoIosSearch className='text-black fs-4' />
        <input type="text" value={searchInputValue} placeholder="Search products..." className="input-search border border-start-0 border-top-0 border-bottom-0 border-secondary ms-2" onChange = {searchProducts}/>
        <div
          className="category-selector ms-4"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          tabIndex={0}
          onBlur={() => setDropdownOpen(false)}
        >
          <div><span className='all-cat'>All categories</span> {dropdownOpen ?<FaAngleUp/> :<FaAngleDown/>}</div>
          {dropdownOpen && (
            <div className="category-dropdown py-5">
              {Object.keys(products).map((cat, i) => (
                <div key={i} className="category-item py-2 px-4" onClick={() => {
                  setSearchInputValue(cat)
                  setAllProducts(altProducts.filter((product) => product.category.name === cat))
                  }}>
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;

  