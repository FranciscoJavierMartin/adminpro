import { Schema, model } from 'mongoose';

const HospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

HospitalSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default model('Hospital', HospitalSchema);
