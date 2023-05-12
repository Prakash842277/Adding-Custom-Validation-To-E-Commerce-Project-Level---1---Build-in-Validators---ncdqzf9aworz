// /* User Model */
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema(
//     {
//         username: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         password: {
//             type: String,
//             required: true,
//         }
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

/*
Add custom validation to the User model
Validate that the username is at least 4 characters long, doesn't contain spaces, and doesn't contain special characters
Also add a validation for checking password length. Password should be atleast 8 chaaacters long.
Throw an error is the Validation fails.
*/
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^[^\s\W]{4,}$/.test(v);
                },
                message: props => `${props.value} is not a valid username! Username should be at least 4 characters long, without spaces or special characters!`
            }
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^.{8,}$/.test(v);
                },
                message: props => `${props.value} is not a valid password! Password should be at least 8 characters long!`
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
