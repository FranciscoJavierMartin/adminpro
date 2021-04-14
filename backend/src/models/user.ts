import { Schema, model } from 'mongoose';
import { UserRoles } from 'constants/userRoles';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: UserRoles,
    default: UserRoles.USER_ROLE,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default model('User', UserSchema);
