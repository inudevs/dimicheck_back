import { Schema, model } from 'mongoose';

const User = new Schema({
  id: String,
  password: String,
  idx: Number,
  name: String,
  grade: String,
  class: String,
  number: String,
  serial: String,
  photo: String,
  email: String,
  userType: String,
  timestamp: { type: Date, default: Date.now() },
});

export default model('User', User);
