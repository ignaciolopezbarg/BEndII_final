import ProductService from '../services/producto.service.js';

export const createProduct = async (req, res) => {
  try {
    const productDTO = await ProductService.createProduct(req.body);
    res.redirect('/admin?message=ProductCreated');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProductDTO = await ProductService.updateProduct(req.params.pid, req.body);
    if (!updatedProductDTO) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.redirect('/admin?message=ProductUpdated');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.pid);
    res.redirect('/admin?message=ProductDeleted');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const productsData = await ProductService.getProducts({ limit, page });

    res.render('adminProducts', {
      products: productsData.docs,
      totalPages: productsData.totalPages,
      page: productsData.page,
      hasPrevPage: productsData.hasPrevPage,
      hasNextPage: productsData.hasNextPage,
      prevPage: productsData.prevPage,
      nextPage: productsData.nextPage,
      user: req.user,
    });
  } catch (error) {
    res.status(500).render('error', { message: 'Error loading products', error });
  }
};

export const getProductForEdit = async (req, res) => {
  try {
    const productDTO = await ProductService.getProductById(req.params.pid);
    res.render('editProduct', { product: productDTO, user: req.user });
  } catch (error) {
    res.status(500).render('error', { message: 'Error loading product for edit', error });
  }
};


//version con la aplicacion de repository y services:
// import  productoService  from "../services/producto.service.js";

// class ProductoController {

// async addProduct (req,res){
//   try {
//     const product = await productoService.addProduct(req.body);
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({error: error.message});
//   }
// }

// async getProducts(req, res) {
//   try {
//       const { page = 1, limit = 10, ...filter } = req.query;
//       const options = { page: parseInt(page), limit: parseInt(limit) };
//       const products = await productoService.getProducts(filter, options);
//       res.json(products);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// }

// async getProductById(req, res) {
//   try {
//       const product = await productoService.getProductById(req.params.id);
//       res.json(product);
//   } catch (error) {
//       res.status(404).json({ error: error.message });
//   }
// }


//   async postProduct(req, res) {
//     try {
//       const product = await productoService.updateProduct(req.params.id, req.body);
//       res.json(product);
//     } catch (error) {
//       res.status(404).send("Error interno del servidor");
//     }
//   }

//   async deleteProduct(req, res) {
//     try {
//         await productoService.deleteProduct(req.params.id);
//         res.status(204).end();
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// }
// }

// export default  new ProductoController;
