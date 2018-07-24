const express = require('express');
const router = express.Router();
const DB = require('../db')

router.get('/all', function (req, res) {
	getData(req, res);
});

router.get('/gateSummary', function (req, res) {
	getGateSummary(req, res);
});

router.get('/entrySummary', function (req, res) {
	getEntrySummary(req, res);
});

router.get('/exitSummary', function (req, res) {
	getExitSummary(req, res);
});

router.post('/gateActivity', function (req, res) {
	insertData(req, res);
});

module.exports = router;
/**********************************************************************************/
async function getData(req, res) {
	try {
		let db = await DB.Get();
		db.collection('gateActivity').find().toArray(function (err, result) {
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
async function getGateSummary(req, res) {
	try {
		let db = await DB.Get();
		let filter = {};
		let gate = '';
		let 
		if (req.query.gate) {
			if (req.query.gate === 'All') {
			}
			else {
				filter.gate = { $eq: req.query.gate };
			}
		}
		filter.fromTs = { $gt: parseInt(req.query.fromTs) };
		filter.toTs = { $lt: parseInt(req.query.toTs) };
		console.log(filter);
		db.collection('gateActivity').aggregate([
			{ $match: filter },
			{
				"$group": {
					"_id": {						
						"hour" :{ "$add": [{ "$hour": { "$add": [new Date(0),{"$multiply":["$toTs",1000]},19800000] } }, 1] },
						"gate": "$gate"
					},
					"totalEntry": { "$sum": "$entry" },
					"totalExit": { "$sum": "$exit" },
				}
			},
			{
				"$group": {
					"_id": {
						"gate": "$_id.gate"
					},
					"hours": {
						"$push": {
							"hour": "$_id.hour",
							"totalEntry": "$totalEntry",
							"totalExit": "$totalExit",
							"gate": "$gate"
						}
					}
				}
			}
		]).toArray(function (err, result) {
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
async function getEntrySummary(req, res) {
	try {
		let db = await DB.Get();
		let filter = {};
		let gate = '';
		if (req.query.gate) {
			if (req.query.gate === 'All') {
			}
			else {
				filter.gate = { $eq: req.query.gate };
			}
		}
		filter.fromTs = { $gt: parseInt(req.query.fromTs) };
		filter.toTs = { $lt: parseInt(req.query.toTs) };
		console.log(filter);
		db.collection('gateActivity').aggregate([
			{ $match: filter },
			{
				"$group": {
					"_id": {
						"hour" :{ "$add": [{ "$hour": { "$add": [new Date(0),{"$multiply":["$toTs",1000]},19800000] } }, 1] },
						"gate": "$gate"
					},
					"totalEntry": { "$sum": "$entry" },
				}
			},
			{
				"$group": {
					"_id": {
						"gate": "$_id.gate"
					},
					"hours": {
						"$push": {
							"hour": "$_id.hour",
							"totalEntry": "$totalEntry",
							"gate": "$gate"
						}
					}
				}
			}
		]).toArray(function (err, result) {
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
async function getExitSummary(req, res) {
	try {
		let db = await DB.Get();
		let filter = {};
		let gate = '';
		if (req.query.gate) {
			if (req.query.gate === 'All') {
			}
			else {
				filter.gate = { $eq: req.query.gate };
			}
		}
		filter.fromTs = { $gt: parseInt(req.query.fromTs) };
		filter.toTs = { $lt: parseInt(req.query.toTs) };
		console.log(filter);
		db.collection('gateActivity').aggregate([
			{ $match: filter },
			{
				"$group": {
					"_id": {
						"hour" :{ "$add": [{ "$hour": { "$add": [new Date(0),{"$multiply":["$toTs",1000]},19800000] } }, 1] },
						"gate": "$gate"
					},
					"totalExit": { "$sum": "$exit" },
				}
			},
			{
				"$group": {
					"_id": {
						"gate": "$_id.gate"
					},
					"hours": {
						"$push": {
							"hour": "$_id.hour",
							"totalExit": "$totalExit",
							"gate": "$gate"
						}
					}
				}
			}
		]).toArray(function (err, result) {
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
async function getMallSummary(req, res) {
	try {
		let db = await DB.Get();
		let filter = {};
		let gate = '';
		if (req.query.gate) {
			if (req.query.gate === 'All') {
			}
			else {
				filter.gate = { $eq: req.query.gate };
			}
		}
		filter.fromTs = { $gt: parseInt(req.query.fromTs) };
		filter.toTs = { $lt: parseInt(req.query.toTs) };
		console.log(filter);
		db.collection('gateActivity').aggregate([
			{ $match: filter },
			{
				"$group": {
					"_id": {
						"hour" :{ "$add": [{ "$hour": { "$add": [new Date(0),{"$multiply":["$toTs",1000]},19800000] } }, 1] }
					},
					"totalExit": { "$sum": "$exit" },
					"totalEntry": { "$sum": "$entry" },
				}
			},
			{
				"$group": {
					"hours": {
						"$push": {
							"hour": "$_id.hour",
							"totalExit": "$totalExit",
							"totalEntry": "$totalEntry",
						}
					}
				}
			}
		]).toArray(function (err, result) {
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
		db.collection("gateActivity").insertOne(req.body, function (err, result) {
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
/************************************************************************************/
// // router.post('/gateActivity', function (req, res) {
// 		// console.log(req.body);
// 		db.collection("gateActivity").insertOne(req.body, function (err, result) {
// 			if (err) {
// 				res.json({ status: "fail" });
// 				throw err;
// 			}
// 			res.json({ status: "success" });
// 			db.close();
// 		});
// //	});
/************************************************************************************/

