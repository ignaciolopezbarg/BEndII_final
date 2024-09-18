//creamos dos middlewares para validar los roles:
//Verificamos que seas admin: 


export function soloAdmin(req, res, next) {
    if(req.user.rol === "admin") {
        next(); 
    } else {
        res.status(403).send("Acceso denegado, solo ingresan admin"); 
    }
}


export function soloUser(req, res, next) {
    if(req.user.rol === "user") {
        next(); 
    } else {
        res.status(403).send("Acceso denegado, solo acceden usuarios");
    }

}