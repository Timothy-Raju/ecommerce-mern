import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderSummary({deliveryOptions, cart, loadCart}){
  const updateQuantity = async (cartItem, quantityChange) => {
    const nextQuantity = cartItem.quantity + quantityChange;

    if (nextQuantity <= 0) {
      alert('Quantity cannot be 0');
      return;
    }

    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: nextQuantity
    });
    await loadCart();
  };

  return(
    <div className="order-summary">
    
      {deliveryOptions.length>0 &&  cart.map((cartItem)=>{

        const selectedDeliveryOption = deliveryOptions
          .find((deliveryOption)=>{
            return deliveryOption.id === cartItem.deliveryOptionId;
        });

        const deleteCartItem =async ()=>{
          await axios.delete(`/api/cart-items/${cartItem.productId}`);
          await loadCart();
        };

        return(
          <div key={cartItem.productId} 
            className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(selectedDeliveryOption.
              estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {cartItem.product.name}
                </div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">
                      {cartItem.quantity}
                    </span>
                  </span>

                  <span className="quantity-controls">
                    <button
                      className="quantity-change-button"
                      onClick={() => updateQuantity(cartItem, -1)}
                    >
                      -
                    </button>

                    <button
                      className="quantity-change-button"
                      onClick={() => updateQuantity(cartItem, 1)}
                    >
                      +
                    </button>
                  </span>

                  <span className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}>
                    Delete
                  </span>
                </div>
              </div>

              <DeliveryOptions loadCart={loadCart} deliveryOptions={deliveryOptions} cartItem={cartItem}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}