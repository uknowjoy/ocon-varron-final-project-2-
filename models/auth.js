const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  // Schema
  const schema = _schema(mongoose);

  // Model
  const Auth = mongoose.model("auth", schema);

  return Auth;
};

function _schema(mongoose){
    return mongoose.Schema({
        id_number: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    });
}
