import ProductoModel from '../models/productos.model.js';
class MongoDBFunkoDAO{
    async crearFunko(datosFunko){
try {
    const funko = new ProductoModel(datosFunko);
    return await funko.save();
} catch (error) {
   throw new Error("Error al crear el funko en mongoDB");
    
}
    }
    async obtenerFunkos(){
try {
    return await ProductoModel.find();
} catch (error) {
    throw new Error("Error al obtener los funkos de MongoDB");
    
}
    }
}
export default MongoDBFunkoDAO;
