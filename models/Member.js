import { model, Schema } from 'mongoose';

const Member = new Schema({
  grade: Number,
  class: Number,
  total: Number,
  current: Number,
  status: [Number],
});

export default model('Member', Member);
