const mongoose = require('mongoose');
require('colors');

const mongoURI =
  'mongodb+srv://baibhavkc11:Password123@cluster0.vqh7y1d.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log('---', err);
    else {
      console.log('MongoDB Database Connected!');
      const fetched_data = await mongoose.connection.db.collection('foodData');
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection('foodCategory');
        foodCategory.find({}).toArray(function (err, categoryData) {
          if (err) console.log(err);
          else {
            global.foodData = data;
            global.foodCategory = categoryData;
          }
        });
      });
    }
  });
};

// For newer version of mongoose package but not able to get global.[collection_name] so using old version.
// const mongoDB = async () => {
//   await mongoose
//     .connect(mongoURI, { useNewUrlParser: true })
//     .then(async () => {
//       console.log('MongoDB Database Connected!');
//       const fetchedData = await mongoose.connection.db.collection('foodData');
//       fetchedData.find({}).toArray(function (err, data) {
//         if (err) {
//           console.log(err);
//         } else {
//           global.foodData = data;
//           console.log(global.foodData);
//         }
//       });
//     })
//     .catch((error) => {
//       console.log('Failed to connect database', error);
//     });
// };

module.exports = mongoDB;
