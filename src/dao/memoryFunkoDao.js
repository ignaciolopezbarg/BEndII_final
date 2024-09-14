class MemoryFunkoDAO {
    constructor() {
        this.funkos = []
    }

    async crearFunko(datosFunko){
        try {
            this.funkos.push(datosFunko);
            return datosFunko; 
        } catch (error) {
            throw new Error("Error al crear el funko en Memoria"); 
        }
    }

    async obtenerFunkos(){
        try {
            return this.funkos; 
        } catch (error) {
            throw new Error("Error al obtener los funkos de Memoria");
        }
    }

}

export default MemoryFunkoDAO; 