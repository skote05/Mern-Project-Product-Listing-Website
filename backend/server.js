import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'
import productRoute from './routes/productRoute.js';
import path from 'path'

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept the json data in the req.body

// API routes
app.use("/api/products", productRoute);

// Production settings
if(process.env.NODE_ENV === "production"){
    // Serve static files from the React frontend app
    app.use(express.static(path.join(__dirname, "frontend", "dist")));
    
    // Handle any requests that don't match the above
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT,() => {
    connectDB();
    console.log("Server listening at http://localhost:"+PORT)
});