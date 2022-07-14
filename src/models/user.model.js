const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
    {
        name:{ type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: {
            type: String, 
            required: true,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbqIQzxuWNieQfyP_k7MgZScr2H2RrDlHZX0nlhh2B5sxPunjMOtMOvyLtcKz5heABjts&usqp=CAU"
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
      timestaps: true,
      versionKey: false,
    }
);


UserSchema.pre("save", function (next) {
    if(!this.isModified("password")) {
        return next();
    }
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", UserSchema);