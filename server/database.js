//Dependencies import
const mongoose = require("mongoose");

//Variable Initialize
let db;

//Connect to MongoDB
exports.connect = (collectionname, connectURL) => {
  let dbLink = connectURL + collectionname;
  mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db = mongoose.connection;
  db.on(
    "error",
    console.error.bind(
      console,
      'Error while connecting to MongoDB using the following mongoURL: "' +
        dbLink +
        '"'
    )
  );
  db.once("open", function () {
    console.log(
      'Connected to MongoDB using collection "' + collectionname + '"'
    );
  });
};

//takes input with type Model. Saves that model in Database. Cant be used before connect.
exports.saveToDB = (input) => {
  input.save(() => {});
};

exports.db = db;
