const mongoose = require('mongoose');
require('colors');

const mongoURI =
  'mongodb+srv://baibhavkc11:Password123@cluster0.vqh7y1d.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const mongoDB = async () => {
  await mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(async () => {
      console.log('MongoDB Database Connected!');
      const fetchedData = await mongoose.connection.db.collection('foodData');
      const allFoodData = await fetchedData.find({}).toArray();
    })
    .catch((error) => {
      console.log('Failed to connect database', error);
    });
};

module.exports = mongoDB;
