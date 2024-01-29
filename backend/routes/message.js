const express = require('express');
const { newMessage, getMessages } = require('../controllers/messageController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');

const router = express.Router();

router.route('/message/new').post(isAuthenticatedUser, newMessage);
router.route('/messages').get(isAuthenticatedUser, getMessages);

module.exports = router;