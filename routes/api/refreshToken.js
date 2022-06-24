const express = require('express');

const refreshTokenController = require('../../controllers/refreshTokenController');

const router = express.Router();

router.route('/')
  .get(refreshTokenController.getAccessToken);

module.exports = router;
