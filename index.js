const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sem",(req,res) => {

	let data = [req.body.name, req.body.countryCode, req.body.phone, req.body.query]
	console.log(data);

	let name = req.body.name;
	let txt = "Name : "+name+"\nphone : "+req.body.countryCode+" "+req.body.phone+ "\nquery : " +req.body.query;

	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "aprasadforwork1@gmail.com",
			pass: "ldtwlkrfhuotbmuo"
		}
	})
	let mailOptions ={
		from : "aprasadforwork1@gmail.com",
		to: "aparnaprasad2004@gmail.com",
		subject: "Enquiry Form by " +name,
		text : txt
	}

	transporter.sendMail(mailOptions,(err,info) =>{
		if(err){
			console.log("mail err ",err);
			res.status(500).json(err);
		}
		else{
			console.log("mail send ",info.response);
			res.status(200).json("mail send");
		}
	})
});

app.listen(9000, () => { console.log("ready @ 9000"); });