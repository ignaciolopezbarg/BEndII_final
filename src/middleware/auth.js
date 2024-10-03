//creamos dos middlewares para validar los roles:
//Verificamos que seas admin:

export function soloAdmin(req, res, next) {
  if (req.user.rol === "admin") {
    next();
  } else {
    res.status(403).send("Acceso denegado, solo ingresan admin");
  }
}

export function soloUser(req, res, next) {
  if (req.user.rol === "user") {
    next();
  } else {
    res.status(403).send("Acceso denegado, solo acceden usuarios");
  }
}
// export const authRol = (rol) => {
//     return (req, res, next) => {
//       if (req.user && req.user.rol === rol) {
//         return next();
//       }
//       return res.status(403).json({ message: 'No puede acceder' });
//     };
//   };