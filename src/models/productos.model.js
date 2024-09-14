import mongoose from "mongoose";

const ProductosSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
 // fullname: String,
  precio: Number,
  descripcion: String,
  stock: Number,
  codigo: String,
});
const ProductoModel = mongoose.model("funkos", ProductosSchema);

export default ProductoModel;
