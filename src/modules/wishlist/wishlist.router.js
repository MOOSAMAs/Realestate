import express from 'express';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
import * as wishlist from './wishlist.controller.js';

const wishlistRouter = express.Router()

wishlistRouter.route('/')
.patch(protectedRoutes , allowedTo('user' , 'admin') , wishlist.addToWishlist)
.delete(protectedRoutes , allowedTo('user' , 'admin') , wishlist.deleteFromWishlist)
.get(protectedRoutes , allowedTo('user' , 'admin') , wishlist.getUserWishlist)

export default wishlistRouter;