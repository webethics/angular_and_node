var fs = require('fs');
var nodemailer = require('nodemailer');

/* delete  file with file path */ 
exports.deleteFile =  (filePath) => {
		  //console.log(remove_path);
			return new Promise(function (resolve, reject) {
			   // var filePath = path.join(dir, file);
				fs.lstat(filePath, function (err, stats) {
					if (err) {
						return reject(err);
					}
					if (stats.isDirectory()) {
						resolve(deleteDirectory(filePath));
					} else {
						fs.unlink(filePath, function (err) {
							if (err) {
								return reject(err);
							}
							resolve();
						});
					}
				});
			  }); 
	    }
		
/*  delete allfiles from directory */
exports.deleteAllfiles = (dir) => {
		fs.readdir(dir, (err, files) => {
		  if (err) throw err;
		  for (const file of files) {
			  file_path  =  dir+'/'+file;
			fs.unlink(file_path, err => {
			  if (err) throw err;
			});
		  }
		});
	} 

/* delete  directory  */
 exports.deleteDirectory = (dir)=> {
			return new Promise(function (resolve, reject) {
				fs.access(dir, function (err) {
					if (err) {
						return reject(err);
					}
					fs.readdir(dir, function (err, files) {
						if (err) {
							return reject(err);
						}
						Promise.all(files.map(function (file) {
							return deleteFile(dir, file);
						})).then(function () {
							fs.rmdir(dir, function (err) {
								if (err) {
									return reject(err);
								}
								resolve();
							});
						}).catch(reject);
					});
				});
			});
		  } 
		  
/* *** Email SMTP setting *** */	
exports.send_email = (mailOptions)=> {
	
var request = require('request');	
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox82c8a4ed19f34a0fb22d48b4c3485155.mailgun.org';
api_key = 'f52e9977df80a4635c11b69ea32873b4-b9c15f4c-8100b388';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});
/* const data = {
	from: 'Excited User <postmaster@sandbox82c8a4ed19f34a0fb22d48b4c3485155.mailgun.org>',
	to: 'rajesh.webethics@gmail.com',
	subject: 'Hello',
	html: '<h1>Testing some Mailgun awesomness!</h1>',
	//attachment: file
}; */
console.log(mailOptions);
mg.messages().send(mailOptions, function (error, body) {
	console.log(body);
});
	
/*let transporter =	nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'php.hunt6@gmail.com',
    pass: 'TeamWebethics3!'
  }
});	 

transporter.sendMail(mailOptions, function(error, info){
  if (error) { 
	console.log(error);
  } else {
	console.log('Email sent: ' + info.response);
  }
}); */

/* let transporter = nodemailer.createTransport({ 
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: '1032638219306-25hh77t3q5fha071aond97l91thmr5pq.apps.googleusercontent.com',
        clientSecret: 'NMiidNt8CBwXrsZwbHCN_5ZY',
		user: 'php.hunt6@gmail.com',
        refreshToken: '1/NDxp7f6uLwShOPxG9SbTm3rJHM5GgNYirWxQnLQC3zM',
        accessToken: 'ya29.Glv2Bci0jCpz4I7lsnSZKX2J1_2MPJXOtUzMtofNJqPLuopgMQd_yex_ZdARE65WSA8KZP1UqW-1ykKKF0bk4fJuCo_ZV-KCm7XCJ93QsijLOojwQj0eBbM3fjeV',
        expires: 2550
    }
});

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
	console.log('Email sent: ' + info.response);
  }
}); */

 
}
/* Read file for render the email template */ 
exports.readHTMLFile = (path, callback)=>{
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
}
