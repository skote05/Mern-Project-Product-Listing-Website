import express from 'express';
import { createProduct, getProduct, deleteProduct, updateProduct } from '../controller/productController.js';

const router = express.Router();

router.get("/",getProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;