import mongoose from 'mongoose';
import bcrypt  from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    recievedFriendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sentFriendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };




export const User = mongoose.model('User', userSchema);
