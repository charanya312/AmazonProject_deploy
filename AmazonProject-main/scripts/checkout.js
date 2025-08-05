import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductsFetch} from '../data/products.js';
import {loadCart, cart} from '../data/cart.js';

async function loadPage() {
  try {
    await loadProductsFetch();

    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });

    renderOrderSummary();
    renderPaymentSummary();

    // ✅ Update cart item count in header
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.checkout-header-middle-section').innerHTML = `
      Checkout (<a class="return-to-home-link" href="amazon.html">${cartCount} item${cartCount !== 1 ? 's' : ''}</a>)
    `;

  } catch (error) {
    console.log('Unexpected error. Please try again later.', error);
  }
}

loadPage();
