import { Schema, model } from 'mongoose';

const Member = new Schema({
  grade: Number,
  class: Number,
  status: [[Number]],
});

export default model('Member', Member);
