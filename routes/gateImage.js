const express = require('express');
const router = express.Router();
const DB = require('../db')

router.get('/', function (req, res) {
	getData(req, res);
});

router.post('/', function (req, res) {
	insertData(req, res);
});

module.exports = router;
/**********************************************************************************/
async function getData(req, res) {
	let gateP=req.query.gate;
	
	try {
		let db = await DB.Get();
		//db.gateImage.find({gate:"gate0"}).sort({$natural:1}).limit(1)
		db.collection("gateImage").find({gate: gateP}).sort({$natural:1}).limit(1).toArray(function (err, result) {
			console.log(result);
			res.json(result);
		});
	}
	catch (err) {
		console.log(err)
		res.status(500).json({ err: err });
	}
}
/**********************************************************************************/
async function insertData(req, res) {
	try {
		let db = await DB.Get();		
		db.collection("gateImage").insertOne(req.body, function (err, result) {
			if (err) {
				res.json({ status: "fail" });
				throw err;
			}
			res.json({ status: "success" });
			db.close();
		});

	}
	catch (err) {
		console.log(err)
		res.status(500).json({ err: err });
	}
}

