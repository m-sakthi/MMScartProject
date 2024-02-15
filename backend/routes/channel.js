const express = require('express');
const { findOrCreate, getChannels, adminFindOrCreate, acceptInvite } = require('../controllers/channelController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');

const router = express.Router();

router.route('/channels/findOrCreate').put(isAuthenticatedUser, findOrCreate);
router.route('/channels/adminFindOrCreate').put(isAuthenticatedUser, adminFindOrCreate);
router.route('/channels').get(isAuthenticatedUser, getChannels);
router.route('/channels/:id/accept').put(isAuthenticatedUser, acceptInvite);

module.exports = router;