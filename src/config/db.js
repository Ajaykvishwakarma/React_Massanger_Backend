// const mongoose = require("mongoose");
// require("dotenv").config();
// module.exports = () => mongoose.connect(process.env.MONGODB_URL);


const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect(
        "mongodb+srv://ajaymessanger:ajaymessanger@cluster0.bjjpj.mongodb.net/?retryWrites=true&w=majority"
    )
}
module.exports = connect;