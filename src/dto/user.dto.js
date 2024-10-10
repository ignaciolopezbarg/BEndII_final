class UserDTO {
    constructor(user, includePassword = false) {
        this.email = user.email;
        this.rol = user.rol; 
        this.cart_id = user.cart_id;
        if (includePassword){
            this.password = user.password;
        }
    }
}

export default UserDTO; 