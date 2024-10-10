
//version con la aplicacion de repository y services:
import  productoService  from "../services/producto.service.js";

class ProductoController {
async addProduct (req,res){
  try {
    const product = await productoService.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

async getProducts(req, res) {
  try {
      const { page = 1, limit = 10, ...filter } = req.query;
      const options = { page: parseInt(page), limit: parseInt(limit) };
      const products = await productoService.getProducts(filter, options);
      res.json(products);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

async getProductById(req, res) {
  try {
      const product = await productoService.getProductById(req.params.id);
      res.json(product);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
}


  async postProduct(req, res) {
    try {
      const product = await productoService.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      res.status(404).send("Error interno del servidor");
    }
  }

  async deleteProduct(req, res) {
    try {
        await productoService.deleteProduct(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
}

export default  new ProductoController;
