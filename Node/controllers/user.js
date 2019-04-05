var express = require('express');
var app 	= express();
var bcrypt  = require('bcrypt');
const saltRounds = 10;
var config_secret = require('../config/DB');
var User = require('../models/User');
var Role = require('../models/Role');
var State = require('../models/State');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens 
var CommonFunction = require('../config/common');
var constant = require('../config/constant');
var mkdirp = require('mkdirp');
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
var crypto = require("crypto");
var moment = require('moment'); 
var Request = require("request");
var jsonQ =require("jsonq");
var jsonQuery = require('json-query');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();  
var Services = require('../models/Service');
var Plan = require('../models/Plan');
const rp = require('request-promise');
// Strip  
const stripe = require('stripe')(constant.secret_key);
/*==============================
*
* Add User
*
/*================================*/
  exports.add_user = (req, res,next) =>{
		var user = new User(req.body);
		pwd = req.body.password;
		var s_id = crypto.randomBytes(20).toString('hex');
		var hashpass = bcrypt.hashSync(pwd, saltRounds);
		user.firstname  = req.body.firstname;
		user.lastname  = req.body.lastname;
		user.phone = req.body.phone;
		user.state = req.body.state;
		user.county = req.body.county;
		user.city = req.body.city;
		user.address = req.body.address;
		user.email = req.body.email;
		user.userRole = req.body.userRole;
		//user.user_type = 'user';
		user.password = hashpass;
		user.verification_code = s_id;
		User.addList(user,(err, user) => {
			if(err) {
				res.json({success: false, message: 'Failed to add new user.'});
			}
			 else if(user) {
				
				// var readHTMLFile = CommonFunction.readHTMLFile('public/pages/email.html');
				 CommonFunction.readHTMLFile(constant.EmailTamplatePath+'/email.html', function(err, html) {
						var template = handlebars.compile(html);
						var message = "Please click  <a href ="+constant.front_end_url+"/verify/"+s_id+">here </a>to confirm your accout." ;
						var replacements = {
							 username: req.body.firstname+' '+req.body.lastname,
							 message:message
						};
						
						var htmlToSend = template(replacements);
						var mailOptions = {
							from: 'Movers <postmaster@sandbox82c8a4ed19f34a0fb22d48b4c3485155.mailgun.org>',
							to : req.body.email,
							subject : 'Signup Email',
							html : entities.decode(htmlToSend)
						 };
						 
					    // send Email 	
				        CommonFunction.send_email(mailOptions);
						
				  });
 
				 res.json({success:true, message: "Please check you email and activate the account to login"});
			}
			else
				res.json({success:false,message: "Not added successfully"});
		  })  
  }
/* ======================================
*
* VERIFY USER
* 
*============================================== */
 exports.verify_code = (req, res)=>{
   var query = { 'verification_code': req.params.id };
   var updateData = { status:1 };
   try{
	   //FIND AND UPDATE USER STATUS 
	   User.findOneAndUpdate(query,{$set:updateData , $unset: {"verification_code": "","verification_date": ""}},updateData, function (err, user){
		  if (err) res.json({success: false, message: 'Something went wrong.'});
		  if(!user){
				 res.status(400).send({success:false,expire:false,message: "This link is not valid."});	  
			   }else{
					res.status(200).send({success:true,expire:false,message: "Correct Code"});
			   }			  
			});
		}catch (error) {
		   res.json({success:false,message: "Code is wrong"});
		}
  }
/*===============================
*
* Check User is already registred with Email
*
* ===============================================*/
 exports.check_email = (req, res,next) => {
   var user = new User(req.body);
   email  = req.body.email;
   var query = { 'email': email };
    User.find(query,function(err, result) {
    if (err) res.json({success: false, message: 'Something went wrong.'});
	  if(result.length >0){
			  res.status(200).send({ success: true, message: 'Email Already exist.' });

	    }else{
             res.json({success:false,message: "Email is valid."});
		}			  
    });
}

/*========================================
*
*  Login function
*
* =======================================*/
 exports.userlogin = async(req, res,next) => {
	   var user = new User(req.body);
	   pwd = req.body.password;
	   email  = req.body.email;
	   const userdata = await User.findOne({ email: email }).populate('userRole');
	   if(userdata!=null){
				if(userdata.status == 0){
						res.json({ success:false,message: 'Your Account is not verified. Please verify your account.'});
				   }
				   else if(userdata.status==2){   
						res.json({success: false, message: 'Your account is deactivated.'});
				   }else{
					/* if account is activated */
					if(bcrypt.compareSync(pwd, userdata.password)){
						// If user is not admin 
						if(userdata.userRole.role_name!='admin'){
									const payload = {
											  email: userdata.email, 
											  id: userdata._id,
											  userRole: userdata.userRole 
									 };
									 // create Token  
									 var token = jwt.sign(payload, config_secret.secret, {
											expiresIn: "15d" 
										}); 		
								   // return the information including token as JSON
									res.json({ success: true,message: 'Login Successfully.',token:token,userid:userdata._id,role_name:userdata.userRole.role_name });
									//return res.redirect('/index');
						}else{
									res.json({ success: false,message: 'You are trying with wrong account.' });
						   }		
					  }else{
									res.json({success: false, message: 'Password is not correct.'});
					  } 
					}
		   }else{
				res.json({success: false, message: 'No Account Found with this email'}); 
				  //res.status(400).send("Email is not correct ");
		  } 
}
/*======================
*
* Forgot password  User
*
*============================ */
  exports.forgotpassword = (req, res,next) =>{	  
	var pass_code = crypto.randomBytes(18).toString('hex');	
	var query = { 'email': req.body.email };
    var updateData = {'forgotpasword_code':pass_code,'forgotpasword_date':new Date()};
    User.findOneAndUpdate(query, updateData, function (err, user){
      if (err) res.json({success: false, message: 'Something went wrong.'});
	  if(!user){
			 res.status(200).send({success:false,message: "You email not found."});	  
	       }else{
		
			 CommonFunction.readHTMLFile(constant.EmailTamplatePath+'/email.html', function(err, html) {
						var template = handlebars.compile(html);
						var message = "Please click  <a href ="+constant.front_end_url+"/resetpassword/"+pass_code+">here </a>to reset passsword." ;
						var replacements = {
							 username: req.body.name,
							 message:message
						};
						
						var htmlToSend = template(replacements);
						 var mailOptions = {
							from: 'Movers <postmaster@sandbox82c8a4ed19f34a0fb22d48b4c3485155.mailgun.org>',
							to : req.body.email,
							subject :  'Forgot Password',
							html : entities.decode(htmlToSend)
						 };
						 
					    /* send Email */ 	
				        CommonFunction.send_email(mailOptions);
						
						res.status(200).send({success:true,message: "Please check Your email to reset the password."});	
		      })			  
       }
    });
  }