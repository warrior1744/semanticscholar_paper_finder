import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    firstname: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    isAdmin: {
        type:Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return bcrypt.compareSync(enteredPassword, this.password)
}

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User