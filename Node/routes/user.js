var express = require('express');
var userRoutes = express.Router();
var bcrypt = require('bcrypt');

var VerifyToken = require('../middleware/authentication');
var UserController = require('../controllers/user');


var constant = require('../config/constant');
var mkdirp = require('mkdirp');
var multer = require('multer');

/* Storage path for image */ 
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, constant.upload_dir)
	},
	filename: (req, file, cb) => {
	  var datetimestamp = Date.now();
	  cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
	}
});
var upload = multer({storage: storage});

/* ******************************
*
* USER API
*
* ******************************** */
/* =================== Add User ============================*/
userRoutes.post('/user/add',UserController.add_user);
  
/* =================== Login function  ============================*/

userRoutes.post('/user/userlogin',UserController.userlogin); 


/* ================ Forgot Password  ===================== */
userRoutes.post('/user/forgotpassword/',UserController.forgotpassword);


/* ================ Check Password code  ===================== */
userRoutes.get('/user/resetpassword/:id',UserController.check_passcode);


/* ================ Check Password code  ===================== */
userRoutes.post('/user/updatepassword/:id',UserController.resetpassword);

/* ================ Change Password   ===================== */
userRoutes.post('/user/changepassword',VerifyToken,UserController.changePassword);

/* ================ User Verify ===================== */
userRoutes.get('/user/verify/:id',UserController.verify_code);

  
/* =================== Check  User Email  ============================*/

userRoutes.post('/user/checkemail',UserController.check_email);

/* ===================  User list  ============================*/

userRoutes.get('/user',VerifyToken,UserController.getuser);

// Defined edit route
userRoutes.get('/user/edit/:id',VerifyToken,UserController.edit_user);

/* =================== Update user  ============================*/
userRoutes.post('/user/update/:id',upload.single('profile_pic'),UserController.update_user);

/* =================== Delete user  ============================*/
userRoutes.get('/user/delete/:id',UserController.delete_user);


/* *************************************
*
* STATE API
*
* *********************************** */

/* ======================= State ============== */
userRoutes.get('/user/states',UserController.getstates);

userRoutes.post('/user/counties',UserController.getCounties);

userRoutes.post('/user/cities',UserController.getcities);

userRoutes.get('/services',UserController.getServices);
userRoutes.get('/plans',UserController.getPlan);

/* ***********************************
*
* ROLE API
*
* ************************** */

/* ==================== Role ================ */
userRoutes.get('/user/roles/:type',UserController.roles);


module.exports = userRoutes;