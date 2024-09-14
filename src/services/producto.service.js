import ProductoRepository from "../repository/ProductoRepository.js";
import DAO from "../dao/factory.js"; 

class ProductoService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository; 
    }

    async obtenerFunkos(){
        return await this.productoRepository.obtenerFunkos(); 
    }

    async crearFunko(producto) {
        return await this.productoRepository.crearFunko(producto)
    }
}

export const productoService = new ProductoService( new ProductoRepository(DAO)); 