import mongoose from "mongoose"
import { DB_NAME } from "../../constants.js"
import {config} from "./config.js"

const connectDB = async () => {
    try{
        const connectInstance = await mongoose.connect(`${config.dbUrl}/${DB_NAME}`)
        console.log(`MongoDB connected!! Host on ${connectInstance.connection.host}`)
    }catch{
        console.log("Mongose connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;