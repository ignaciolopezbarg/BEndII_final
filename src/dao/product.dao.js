import ProductoModel from "../models/product.model.js";
class ProductDAO {
  async crearProducto(datosProducto) {
    try {
      const producto = new ProductoModel(datosProducto);
      return await producto.save();
    } catch (error) {
      throw new Error("Error al crear el producto en mongoDB");
    }
  }
  // async obtenerProductos() {
  //   try {
  //     return await ProductoModel.find();
  //   } catch (error) {
  //     throw new Error("Error al obtener los productos de MongoDB");
  //   }
  // }
  async obtenerProductos(filter = {}, options = {}){
return await ProductoModel.paginate(filter,options);
  }

  async findById(productId){
    return await ProductoModel.findById(productId);
  }

  async update(productId, updateData){
    return await ProductoModel.findByIdAndUpdate(productId, updateData, { new: true});
  }

  async delete(productId){
    return await ProductoModel.findByIdAndDelete(productId);
  }
}
export default new ProductDAO;
