import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userShema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userShema);

export default User;
