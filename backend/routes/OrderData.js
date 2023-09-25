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

module.exports = router;
