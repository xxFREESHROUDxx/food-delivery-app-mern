const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  //   await data.splice(0, 0, { Order_date: req.body.order_date });
  //  if you need to add the date inside the order_data only.
  //  Also you need to remove the order_date form $push in findOneAndUpdate

  const { order_date, email } = req.body;

  // If email doesn't exist in db then create elseo InsertMany()
  let emailId = await Order.findOne({ email });

  if (emailId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
        order_date: [order_date],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send('Server Error', error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: data, order_date: order_date } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
});

// Route for showing client's ordered data
router.post('/myOrderData', async (req, res) => {
  try {
    //get the data for the user's email
    let userData = await Order.findOne({ email: req.body.email });
    if (!userData) {
      // If no data is found for the user, you can return an empty array or an appropriate message.
      return res.json({ orderData: [] });
    }

    // const orderData = [];

    const sortedOrders = userData.order_data
      .map((order, index) => ({
        order_date: userData.order_date[index],
        items: order.map((foodItem) => ({
          ...foodItem,
        })),
      }))
      .sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

    // for (let i = 0; i < userData.order_data.length; i++) {
    //   const orderDate = userData.order_date[i];

    //   for (const foodItem of userData.order_data[i]) {
    //     const mergedData = {
    //       order_date: orderDate,
    //       ...foodItem,
    //     };
    //     orderData.push(mergedData);
    //   }
    // }

    res.json({ orderData: sortedOrders });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
