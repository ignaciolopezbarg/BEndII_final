import express from 'express';
import passport from 'passport';
import { authorizeRol } from '../middleware/authorization.js';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductForEdit } from '../controllers/producto.controller.js';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), authorizeRol('admin'), getAllProducts);

router.get('/create', passport.authenticate('jwt', { session: false }), authorizeRol('admin'), (req, res) => {
  res.render('createProduct', { user: req.user });
});

router.post('/create', passport.authenticate('jwt', { session: false }), authorizeRol('admin'), createProduct);

router.get('/edit/:pid', passport.authenticate('jwt', { session: false }), authorizeRol('admin'), getProductForEdit);

router.post('/edit/:pid', passport.authenticate('jwt', { session: false }), authorizeRol('admin'), updateProduct);

router.post('/delete/:pid', passport.authenticate('jwt', { session: false }), authorizeRol('admin'), deleteProduct);

export default router;


