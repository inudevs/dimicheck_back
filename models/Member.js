import { Schema, model } from 'mongoose';

const Member = new Schema({
  grade: Number,
  klass: Number,
  status: [[Number]],
});

export default model('Member', Member);
