import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link, useSearchParams } from 'react-router';
import './TrackingPage.css';
import { Header } from '../components/Header';

export  function TrackingPage() {
  const [searchParams] = useSearchParams();
  const [trackingProduct, setTrackingProduct] = useState(null);

  const orderId = searchParams.get('orderId') || '';
  const productId = searchParams.get('productId') || '';

  useEffect(() => {
    const loadTrackingDetails = async () => {
      if (!orderId || !productId) {
        setTrackingProduct(null);
        return;
      }

      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      const orderProduct = response.data.products.find((product) => product.productId === productId);

      setTrackingProduct(orderProduct || null);
    };

    loadTrackingDetails();
  }, [orderId, productId]);

  if (!trackingProduct) {
    return (
      <>
        <title>Tracking</title>
        <Header />

        <div className="tracking-page">
          <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>

            <div className="product-info">Tracking information is not available for this item.</div>
          </div>
        </div>
      </>
    );
  }

  const deliveryDate = dayjs(trackingProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D');

  return (
    <>
      <title>Tracking</title>
      <Header/>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {deliveryDate}
          </div>

          <div className="product-info">
            {trackingProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {trackingProduct.quantity}
          </div>

          <img className="product-image" src={trackingProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  )
}
