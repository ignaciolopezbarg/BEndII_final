import ProductoModel from "../models/product.model.js";
class ProductDAO {
  async createProduct(datosProducto) {
    try {
      const producto = new ProductoModel(datosProducto);
      return await producto.save();
    } catch (error) {
      throw new Error("Error al crear el producto en mongoDB");
    }
  }

  async obtenerProductos(filter = {}, options = {}) {
    try {
      return await ProductoModel.paginate(filter, options);
    } catch (error) {
      console.error("Error al obtener los productos", error);
      throw error;
    }
  }

  async findById(productId) {
    try {
      return await ProductoModel.findById(productId);
    } catch (error) {
      console.error("Error al buscar producto por Id", error);
      throw error;
    }
  }

  async update(productId, updateData) {
    try {
      return await ProductoModel.findByIdAndUpdate(productId, updateData, {
        new: true,
      });
    } catch (error) {
      console.error("Error al actualizar", error);
      throw error;
    }
  }

  async delete(productId) {
    try {
      return await ProductoModel.findByIdAndDelete(productId);
    } catch (error) {
      console.error("Error al eliminar producto", error);
      throw error;
    }
  }
}
export default new ProductDAO();
