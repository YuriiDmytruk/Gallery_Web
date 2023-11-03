import mongoose from 'mongoose';

const uri =
  'mongodb+srv://yurii:mongoDB1@axel.wkuuigc.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error: Error) =>
    console.error('Error connecting to MongoDB:', error)
  );

module.exports = mongoose;
