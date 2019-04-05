var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items

var UserSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
	required: true, 
	unique: true
  },
  phone: {
    type: String
  },
  state: {
    type: String
  },
  county:  [{
    type: String
}],
  city: {
    type: String
  }, 
  address: {
    type: String
  },
  zipcode: {
    type: String
  },
  status: {
    type: String,
	default:'0' 
  }, 
  verification_code: {
    type: String
  },
  verification_date: {
   type: Date, 
   default: Date.now 
  },
  forgotpasword_code: {
    type: String
  },
  forgotpasword_date: {
    type: String
  },
   password: {
    type: Object,
	required: true, 
  },
  userRole: { type: Schema.Types.ObjectId, ref: 'roles'} ,
  services: { type: Schema.Types.ObjectId, ref: 'services'} ,
  //planId :   { type: Schema.Types.ObjectId, ref: 'plans'} ,
  planId :   { type: Schema.Types.ObjectId, ref: 'plans'} ,
  subscription_id: { type: String},
  customer_id: { type: String },
  created_at: { 
  type: Date, 
  default: Date.now 
  },
  profile_pic: {
    type: String
	},
  companyName: {
    type: String
	},
	totalbid: {
    type: Number
	}
});

// User role 
var UserRoleSchema = new Schema({
  user_role: {
    type: String
  }
});


// User role 
var PlanSchema = new Schema({
  plan_bid: {
    type: String
  },
  plan_stripe_id: {
    type: String
  }
});

const User = module.exports= mongoose.model('User', UserSchema,'users'); 
const UserRole = mongoose.model('user_roles', UserRoleSchema); 
const Plan = mongoose.model('plans', PlanSchema); 
//module.exports = {User,UserRole} ;   //collection name 'users' need to create collection first


module.exports.addList = (User, callback) => {
    User.save(callback);
}