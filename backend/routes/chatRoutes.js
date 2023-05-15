const express=require('express');
const router=express.Router();

//controllers
const chatController=require('../controllers/chatController');

//middlewares
const authMiddleware=require('../middleware/authMiddleware');

router.post('/',authMiddleware.protect,chatController.accessChat);
router.get('/',authMiddleware.protect,chatController.fetchChats);
router.post('/group',authMiddleware.protect,chatController.createGroupChat);
router.put('/rename',authMiddleware.protect,chatController.renameGroup); //put() request as we are updating the group name
router.put('/groupadd',authMiddleware.protect,chatController.addToGroup); //put() request
router.put('/groupremove',authMiddleware.protect,chatController.removeFromGroup); //put() request

module.exports=router;