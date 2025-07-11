import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        image : {
            type : String,
            required : true
        }
    },
    {
        timestamp : true //createdAt, updatedAt
    }
);

const Product = mongoose.model("Product",productSchema); //mongoose will handle it and convert the Product to products. (Product inside the model paranthesis not the variable storing it)

export default Product;