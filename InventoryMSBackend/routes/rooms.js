const express = require('express');
const { registerRoom, updateRoomStatus } = require('../controllers/rooms');
const router = express.Router();

router.post('/rooms', registerRoom);
router.patch('/rooms/:id', updateRoomStatus);

module.exports = router;
