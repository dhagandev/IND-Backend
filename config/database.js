var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
.catch((err) => {console.log(err)});

mongoose.connection.on('connected', function () {
  console.log(`Mongoose connected to the database.`);
});

module.exports = mongoose;