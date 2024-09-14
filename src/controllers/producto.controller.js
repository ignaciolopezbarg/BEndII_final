
// import DAO from "../dao/factory.js";
// import FunkoDTO from "../dto/producto.dto.js";
// const funkoService = new DAO();

//Con repository y services:
import {productoService} from "../services/producto.service.js"; 

// class ProductoController {
//     async getProductos(req, res) {
//         try {
//             const funkos = await funkoService.obtenerFunkos();
//             res.json(funkos);

//         } catch (error) {
//             res.send("Error interno del servidor");

//         }
//     }

//     async postProducto(req, res) {
//         const { nombre, categoria, precio, stock, codigo, descripcion } = req.body;
//         try {
            
//             const funkoDTO = new FunkoDTO(nombre, categoria, precio, stock, codigo, descripcion);
//             //console.log("DTO creado")
//             const funko = await funkoService.crearFunko(funkoDTO);
//             res.json(funko);
//         } catch (error) {
//             res.send("Error interno del servidor");

//         }
//     }
// }

//version con la aplicacion de repository y services:
class ProductoController {
  async getProductos(req, res) {
      try {
          const juguetes = await productoService.obtenerJuguetes();
          res.json(juguetes);

      } catch (error) {
          res.send("Error interno del servidor");

      }
  }

  async postProducto(req, res) {
      try {
          const juguete = await productoService.crearJuguete(req.body);
          res.json(juguete);
      } catch (error) {
          res.send("Error interno del servidor");
      }
  }
}



export default ProductoController;