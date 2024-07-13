const mongoose = require("mongoose")

const URL = "mongodb://localhost:27017/notes" || process.env.MONGO_URL;

mongoose.connect(URL).then(()=>{
    console.log('MongoDB connected')
}).catch((error)=> {
    console.log(error)
})