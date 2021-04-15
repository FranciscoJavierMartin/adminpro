import { Schema, model } from 'mongoose';

const DoctorSchema = new Schema({
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
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital'
  }
});

DoctorSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default model('Doctor', DoctorSchema);
