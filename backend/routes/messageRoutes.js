const express=require('express');
const router=express.Router();

//controller
const messageController=require('../controllers/messageController');
//middleware
const authMiddleware=require('../middleware/authMiddleware');

router.post('/',authMiddleware.protect,messageController.sendMessage);
router.get('/:chatId',authMiddleware.protect,messageController.allMessages);

module.exports=router;