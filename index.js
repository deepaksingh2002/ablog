import connectDB from "./src/config/db.js";
import {config} from "./src/config/config.js";
import {app} from "./src/app.js"

connectDB()
    .then(()=>{
        app.listen(config.port || 8000, () => {
            console.log(`Server is running on port : ${config.port ? config.port : 8000}`);
        })
    }).catch(
        (err) => console.log("MongoDB connection faild!!",err)
    )





