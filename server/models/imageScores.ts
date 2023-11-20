import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const imageScoresShema = new Schema(
  {
    imageId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userScores: {
      type: [{ userId: Schema.Types.ObjectId, score: Number }],
      required: true,
    },
  },
  { timestamps: true }
);

const ImageScores = mongoose.model(
  'ImageScores',
  imageScoresShema,
  'imagescores'
);

export default ImageScores;
