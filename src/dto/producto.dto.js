class FunkoDTO{

    constructor(nombre, categoria, descripcion, precio, stock, codigo){
        this.nombre = nombre;
        this.categoria = categoria;
        this.fullname = `${nombre}${categoria}`;
        this.precio = precio;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.stock = stock;
    }
}
export default FunkoDTO;

