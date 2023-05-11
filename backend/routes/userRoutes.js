const express=require('express');
const router=express.Router();

//controllers
const userController=require('../controllers/userController');

//middleware
const authMiddleware=require('../middleware/authMiddleware');

router.post('/',userController.registerUser);
router.post('/login',userController.authUser);
router.get('/',authMiddleware.protect,userController.getUser);

module.exports=router;