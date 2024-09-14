import mongoose from 'mongoose';
import configObject from './config/config.js';
const{ mongo_url }= configObject;

mongoose.connect(mongo_url)

.then(() => console.log('Conectados a la BD'))
.catch((error) =>console.log('Error al conectarnos :', error))

// import configObject from "./config/config.js";
// const { mongo_url} = configObject
// //creo una clase
// class BaseDatos{
//     //se crea una variable estatica(le pertenece a la clase) y privada, o sea solo se trabaja dentro de esta clase
//     static #instancia;
//    constructor(){
// mongoose.connect(mongo_url)//la mongo_url, podra ser la bd o la bdlocal(localhost), dependiendo del entorno donde trabajo
//    }
//    //metodo que valida la instancia, si existe la retorna, sino la crea 
//   static getInstancia(){
// if(this.#instancia){
//     console.log('Conexion previa')
//     return this.#instancia;
// }
// this.#instancia = new BaseDatos();
// console.log('Conexion exitosa')
// return this.#instancia;
//    }
// }
// export default BaseDatos.getInstancia();