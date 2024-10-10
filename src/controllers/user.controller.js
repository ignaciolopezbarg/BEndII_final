import UserService from '../services/user.service.js';

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const newUser = await UserService.register({
      first_name,
      last_name,
      email,
      age,
      password,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, rol } = await UserService.login(email, password);

    res.cookie('token', token, { httpOnly: true });

    if (rol === 'admin') {
      return res.redirect('/admin');
    } else if (rol === 'user') {
      return res.redirect('/products');
    } else {
      return res.status(400).json({ message: 'Rol no reconocido' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await UserService.getCurrentUser(req.user._id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout exitoso' });
};



// import UserService from "../services/user.service.js";
// import jwt from "jsonwebtoken";
// import UserDTO from "../dto/user.dto.js";

// class userController {
//     async register(req, res) {
//         const {first_name, last_name, email, age, password} = req.body; 

//         try {
//             const nuevoUsuario = await UserService.register({first_name, last_name, email, age, password}); 
//             res.status(201).json({ message: 'Usuario registrado exitosamente'});

//             const token = jwt.sign({
//                 usuario: nuevoUsuario.first_name,
//                 email: nuevoUsuario.email,
//                 rol: nuevoUsuario.rol
//             }, "coderhouse", {expiresIn: "1h"});

//             res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true});
//             res.redirect("/api/sessions/current");
//         } catch (error) {
//             res.status(500).send("Error del server");
//             console.log(error)
//         }
//     }

//     async login(req, res) {
//         const {email, password} = req.body; 

//         try {
//             const user = await UserService.loginUser(email, password);
//             const token = jwt.sign({
//                 usuario: user.first_name,
//                 email: user.email,
//                 rol: user.rol
//             }, "coderhouse", {expiresIn: "1h"});

//             res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true});
//             res.redirect("/api/sessions/current");
//         } catch (error) {
//             res.status(500).send("Error del server");
//         }
//     }

//     async current(req, res) {
//         if(req.user) {
//             const user = req.user; 
//             const userDTO = new UserDTO(user); 
//             res.render("home", {user: userDTO})
//         } else {
//             res.send("No autorizado");
//         }
//     }

//     logout(req, res) {
//         res.clearCookie("coderCookieToken");
//         res.redirect("/login");
//     }
// }

// export default new userController(); 