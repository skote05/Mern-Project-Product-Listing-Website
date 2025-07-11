import mongoose from "mongoose";
import Product from "../models/product.js";

export const getProduct = async (req,res) => {
    try{
        const products = await Product.find();
        res.status(201).json({success : true, data : products, message : "Products found successfully"});
    } catch(err){
        console.error("Error fetching products: ",err.message);
        res.status(500).json({success : false, message : "Server error"});
    } 
};

export const createProduct = async (req,res) => {
    const product = req.body; //user will send this data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success : false, message : "Please provide all the fields"});
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success : true, data : newProduct});// 201 -success
    } catch(error){
        console.error("Error while creating product: ",error.message);
        res.status(500).json({success : false, message : "Server error"}); // 500 -internal error
    }
};

export const updateProduct = async (req,res) => {
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message : "Invalid product id"});
    }
    try{
        const updatedProducts = await Product.findByIdAndUpdate(id,product,{new : true});
        res.status(201).json({success : true, data : updatedProducts});
    } catch(err){
        console.error("Error updating the product",err.message);
        res.status(500).json({success : false, message : "Server error"});
    }
};

export const deleteProduct = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message : "Invalid product id"});
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(201).json({success : true, message : "Product deleted successfully"});
    } catch(err){
        console.error("Error in deleting product",err.message);
        res.status(500).json({success : false, message : "Server error"});
    }
};