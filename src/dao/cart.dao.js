import CartModel from "../models/cart.model.js";

class CartDAO {
  async create() {
    const newCart = new CartModel({products: []});
    return await newCart.save();
  }

  async getById(cartId) {
    return await CartModel.findById(cartId).populate('products.product');
  }

  async addProductToCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    cart.products.push({ product: productId, quantity: 1 });
    return await cart.save();
  }

  async getCarts(){
    return await CartModel.find();
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    cart.products = cart.products.filter(p => p.product.toString() !== productId.toString());
    return await cart.save();
  }

  async update(cartId, cartData) {
    return await CartModel.findByIdAndUpdate(cartId, cartData, { new: true });
  }

  async clearCart(cartId) {
    return await CartModel.findByIdAndUpdate(cartId, {products: []}, {new: true})
  }
}

export default new CartDAO();