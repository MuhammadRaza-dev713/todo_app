const mongoose  = require("mongoose")

const mongodbConnect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb is Connected!")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = mongodbConnect;