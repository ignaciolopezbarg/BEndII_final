import ProductoModel from "../models/product.model.js";
class ProductDAO {
  async crearProducto(datosProducto) {
    try {
      const product = new ProductoModel(datosProducto);
      return await product.save();
    } catch (error) {
      throw new Error("Error al crear el producto en mongoDB");
    }
  }
  async obtenerProductos() {
    try {
      return await ProductoModel.find();
    } catch (error) {
      throw new Error("Error al obtener los productos de MongoDB");
    }
  }
}
export default ProductDAO;
