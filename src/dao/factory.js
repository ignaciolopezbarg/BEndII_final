import MongoDBFunkoDAO from "./mongoDBFunkoDao.js";
import MemoryFunkoDAO from "./memoryFunkoDao.js";
import config from "../config/config.js";

let DAO; 

switch(config.persistence) {
    case "mongo":
        DAO = new MongoDBFunkoDAO;
        break;
    case "memory":
        DAO = new MemoryFunkoDAO;
        break; 
    default: 
        throw new Error("Persistencia no valida"); 
}

export default DAO; 