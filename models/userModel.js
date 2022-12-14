import mongoose from "mongoose";

import bcrypt, { hash } from 'bcrypt';
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        lowercase: true,
        validate: [validator.isAlphanumeric, "only alpha numeric characters"],
    },
    email: {
        type: String,
        required:  [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Enter valid email"],
    },
    password:{
        type: String,
        required:  [true, "Password is required"],
        minLenght: [4, "at least it should be 4 characters"],
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        
    ],
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
{
    timestamps: true,
}
);

userSchema.pre('save' ,function(next){
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema)

export default User