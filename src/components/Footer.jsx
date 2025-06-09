import React from 'react';
import '../footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>PRODUCT</h4>
          <p>Lorem ipsum</p>
          <p>Become a Vendor</p>
        </div>
        <div className="footer-section">
          <h4>EARNINGS</h4>
          <p>Lorem ipsum</p>
          <p>Advertise your product</p>
          <p>Sell on Market</p>
        </div>
        <div className="footer-section">
          <h4>CONTACT</h4>
          <p>Email: Floyd_Hyatt@hotmail.com</p>
          <p>Address: 100 Lake Road, Fort Dena 93258-6989</p>
          <p>Phone: (520) 388-2087 x899</p>
          <p>Country: Belgium</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
