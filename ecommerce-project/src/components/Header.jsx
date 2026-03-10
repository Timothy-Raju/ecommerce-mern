import { useEffect, useState } from 'react';
import './header.css'
import { Link, useNavigate } from 'react-router';

export function Header({ cart = [], initialSearch = '' }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(initialSearch);

  useEffect(() => {
    setSearchText(initialSearch);
  }, [initialSearch]);

  let totalQuantity = 0;

  cart.forEach((cartItem)=>{
    totalQuantity+=cartItem.quantity;
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedSearchText = searchText.trim();
    if (trimmedSearchText) {
      navigate(`/?search=${encodeURIComponent(trimmedSearchText)}`);
      return;
    }

    navigate('/');
  };

  return (
    
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <form className="middle-section" onSubmit={handleSubmit}>
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <button className="search-button" type="submit">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </form>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
    
  );
}
