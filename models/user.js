const { Schema } = require("mongoose");

module.exports = (mongoose) => {

  const schema = _schema(mongoose);

  const User = mongoose.model("user", schema);

  return User;
};

function _schema(mongoose){
    return mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    });
}