var MongoClient = require('mongodb').MongoClient;

var DB = function () {

    var db = null;
    var instance = 0;

    async function DbConnect() {
        try {
            let url = 'mongodb://localhost:27017/delvia1';
            let _db = await MongoClient.connect(url);

            return _db.db('delvia1')
        } catch (e) {
            return e;
        }
    }

    async function Get() {
        try {
            instance++;     // this is just to count how many times our singleton is called.
            console.log(`DbConnection called ${instance} times`);

            if (db != null) {
                console.log(`db connection is already alive`);
                return db;
            } else {
                console.log(`getting new db connection`);
                db = await DbConnect();
                return db;
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}


module.exports = DB();