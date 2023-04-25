const mongoose = require('mongoose')

const Schema = mongoose.Schema

//* adding the bcrypt library
const bcrypt = require('bcrypt')

//* determines how much processing time it will take to perform the hash
const SALT_ROUNDS = 6; // 6 is a reasonable numbers

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true
    }
},
{timestamps: true,
toJSON: function(doc, ret) {
delete ret.password;
return ret;

}

});

//* PRE HOOK
userSchema.pre('save', async function(next) {
    // if password is NOT modified continue to the next middleware
    if (!this.isModified('password')) return next();

    // update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
})

module.exports = mongoose.model("User", userSchema)