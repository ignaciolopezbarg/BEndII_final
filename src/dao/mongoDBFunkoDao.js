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
/////////////////////////////////////////////////
// class MongoDBFunkoDAO {
//     async crearFunko(funkoDTO) {
//         try {
//             console.log("DTO recibido en MongoDBFunkoDAO:", funkoDTO);
            
//             const funkoData = {
//                 nombre: funkoDTO.nombre,
//                 categoria: funkoDTO.categoria,
//                 fullname: funkoDTO.fullname,
//                 precio: funkoDTO.precio,
//                 codigo: funkoDTO.codigo,
//                 descripcion: funkoDTO.descripcion,
//                 stock: funkoDTO.stock
//             };
            
//             console.log("Datos a guardar en MongoDB:", funkoData);
            
//             const funko = new ProductoModel(funkoData);
//             const savedFunko = await funko.save();
            
//             console.log("Funko guardado en MongoDB:", savedFunko);
            
//             return savedFunko;
//         } catch (error) {
//             console.error("Error al crear el funko en MongoDB:", error);
//             throw new Error("Error al crear el funko en MongoDB: " + error.message);
//         }
//     }
// }
// export default MongoDBFunkoDAO;