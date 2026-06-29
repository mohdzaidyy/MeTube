import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({
    path : './env'
});

const port = process.env.PORT ? process.env.PORT : 4000;

connectDB()
.then(() => {
    app.on('error', (error) => {
        console.log("Server Error", error);
    });
    app.listen( port, ()=>{
        console.log(`\nServer is running on PORT ${port}`);
    })
}
)
.catch((error)=>{
    console.log("MongoDB connection FAILED!!", error);
})