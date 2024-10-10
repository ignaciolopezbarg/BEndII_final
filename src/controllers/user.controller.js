import UserService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

class userController {
    async register(req, res) {
        const {first_name, last_name, email, age, password} = req.body; 

        try {
            const nuevoUsuario = await UserService.registerUser({first_name, last_name, email, age, password}); 

            const token = jwt.sign({
                usuario: nuevoUsuario.first_name,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            }, "coderhouse", {expiresIn: "1h"});

            res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true});
            res.redirect("/api/sessions/current");
        } catch (error) {
            res.status(500).send("Error del server");
            console.log(error)
        }
    }

    async login(req, res) {
        const {email, password} = req.body; 

        try {
            const user = await UserService.loginUser(email, password);
            const token = jwt.sign({
                usuario: user.first_name,
                email: user.email,
                rol: user.rol
            }, "coderhouse", {expiresIn: "1h"});

            res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true});
            res.redirect("/api/sessions/current");
        } catch (error) {
            res.status(500).send("Error del server");
        }
    }

    async current(req, res) {
        if(req.user) {
            const user = req.user; 
            const userDTO = new UserDTO(user); 
            res.render("home", {user: userDTO})
        } else {
            res.send("No autorizado");
        }
    }

    logout(req, res) {
        res.clearCookie("coderCookieToken");
        res.redirect("/login");
    }
}

export default new userController(); 