import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        validate:
        {
            validator: function (v) {
                return /^[a-zA-Z0-9_]{3,15}$/.test(v)
            },
            message: props => `${props.value} username is not valid!`,
        }
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} email is not valid!`,

        }

    },
    password: {
        type: String,
        required: true
    },

},
    {
        timestamps: true,

    })
let user = new mongoose.model('user', userSchema);
export default user;