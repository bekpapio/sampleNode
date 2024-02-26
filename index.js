const express=require("express");
const dotenv=require("dotenv").config()
const bookRoute=require('./routes/bookRoute')
const authorRoute=require('./routes/authorRoute')
const userRoute=require('./routes/userRoute')
const connectDB=require("./config/db");
// const errorHandler = require("./middleware/errorHandler");
const app= express();

app.use(express.json());
connectDB();

app.use("/api/books",bookRoute)
app.use("/api/authors",authorRoute)
app.use("/api/users",userRoute)

// app.use(errorHandler);
 const port=process.env.PORT || 4000
app.listen(port,()=>console.log(`server is running on port ${port}`));