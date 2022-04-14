const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group');

router.get('/:groupId', groupController.getGroupById);

router.post('/', groupController.createGroup);
router.post('/:userId/:groupId/members/add', groupController.addMembers);

router.put('/:groupId', groupController.modifyGroup);

router.delete('/:groupId', groupController.deleteGroup);
router.delete('/:groupId/members/delete', groupController.deleteMembers);

module.exports = router;