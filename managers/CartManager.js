import Vue from 'vue';

const initialState = {
  open: false,
  items: [],
};

export class CartManager {
  state;

  constructor() {
    this.state = Vue.observable(initialState);
  }

  open() {
    this.state.open = true;

    return this.getState();
  }

  close() {
    this.state.open = false;

    return this.getState();
  }

  productIsInTheCart(product) {
    return !!this.state.items.find(({ id }) => id === product.id);
  }

  addProduct(product) {
    if (!this.productIsInTheCart(product)) {
      this.state.items.push(product);
    }

    return this.getState();
  }

  removeProduct(productId) {
    this.state.items = this.state.items.filter(({ id }) => id !== productId);

    return this.getState();
  }

  clearProducts() {
    this.state.items = [];

    return this.getState();
  }

  clearCart() {
    this.clearProducts();
    this.close();

    return this.getState();
  }

  hasProducts() {
    return this.state.items.length > 0;
  }

  getState() {
    return Object.freeze({
      ...this.state,
    });
  }
}

export default {
  install: (vm) => {
    /* istanbul ignore next */
    vm.prototype.$cart = new CartManager();
  },
};
