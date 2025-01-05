import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './Config/db.js';
import userRoutes from './Routes/user.routes.js';
import path from 'path';




const app = express();

dotenv.config();
connectDB();

app.use(express.json());  
app.use(express.urlencoded({extended:false}));       
app.use(cors()); 


// Routes
app.use('/api/users', userRoutes);


const __dirname = path.resolve();
console.log(path.resolve(__dirname, "client", "dist", "index.html"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    );
  }
  
  app.use(express.static(path.join(__dirname, 'client', 'public')));
  
  





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


