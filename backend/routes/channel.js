const express = require('express');
const { findOrCreate, getChannels, adminFindOrCreate } = require('../controllers/channelController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');

const router = express.Router();

router.route('/channels/findOrCreate').put(isAuthenticatedUser, findOrCreate);
router.route('/channels/adminFindOrCreate').put(isAuthenticatedUser, adminFindOrCreate);
router.route('/channels').get(isAuthenticatedUser, getChannels);

module.exports = router;