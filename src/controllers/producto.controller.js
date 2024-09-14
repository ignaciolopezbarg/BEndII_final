
import DAO from "../dao/factory.js";
import FunkoDTO from "../dto/producto.dto.js";
const funkoService = new DAO();


class ProductoController {
    async getProductos(req, res) {
        try {
            const funkos = await funkoService.obtenerFunkos();
            res.json(funkos);

        } catch (error) {
            res.send("Error interno del servidor");

        }
    }

    async postProducto(req, res) {
        const { nombre, categoria, precio, stock, codigo, descripcion } = req.body;
        try {
            
            const funkoDTO = new FunkoDTO(nombre, categoria, precio, stock, codigo, descripcion);
            //console.log("DTO creado")
            const funko = await funkoService.crearFunko(funkoDTO);
            res.json(funko);
        } catch (error) {
            res.send("Error interno del servidor");

        }
    }
}

export default ProductoController;