class ProductoRepository{
    constructor(dao){
        this.dao = dao;
    }
    async obtenerFunkos(){
        return this.dao.obtenerFunkos()
    }
    async crearFunko(producto){
        return this.dao.crearFunko(producto);
    }
}
export default ProductoRepository;