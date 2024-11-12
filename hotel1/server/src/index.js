import userRouter from './routes/user.routes.js';
import dotenv from "dotenv"
import express from "express"
import {connectToDatabase} from "./db/db.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import adminRouter  from "./routes/admin.routes.js"


dotenv.config();

const dbConnection = connectToDatabase();



const app = express()

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())



// declaration of routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter); // Add 
app.listen(3000,()=>{
    console.log("server is listening on port ",3000);
    
})