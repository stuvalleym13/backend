import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  contact: String,
  city: String,
  password: { type: String },
  role: {
    type: String,
    enum: ["admin", "author", "user", 'editor']
  },

  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'BlogPost'
  }]

});

const User = model('User', userSchema);
export default User;





