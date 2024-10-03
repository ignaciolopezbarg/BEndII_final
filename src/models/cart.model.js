import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

cartSchema.pre('findOne', function (next) {
  this.populate('productos.producto', '_id title price');
  next();
});

const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;