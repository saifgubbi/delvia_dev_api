const express = require('express');
const router = express.Router();
const DB = require('../db')

router.get('/imageData', function (req, res) {
	getData(req, res);
});

router.post('/imageData', function (req, res) {
	insertData(req, res);
});

module.exports = router;
/**********************************************************************************/
async function getData(req, res) {
	try {
		let db = await DB.Get();
		db.collection('gateImage').find().toArray(function (err, result) {
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

