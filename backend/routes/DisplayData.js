const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    res.send([global.foodData]);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
