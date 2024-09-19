import CartDao from "../dao/cart.dao.js";
class CartRepository{
     async createCart(){
        return await CartDao.create();
     }
}
export default CartRepository;