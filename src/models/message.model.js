const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
    {
        sender : { type : mongoose.Schema.Types.ObjectId, ref : "user"},
        content : { type: String, trim : true},
        chat: { type: mongoose.Schema.Types.ObjectId, ref : "chat"},
        readBy : [{ type : mongoose.Schema.Types.ObjectId, ref: "user"}],
    },{
        timestamp: true,
        versionKey: false
    }
);

module.exports = mongoose.model("message", MessageSchema);