const mongoose = require("mongoose");


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-network-api", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;

