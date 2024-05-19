const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  // Schema
  const schema = _schema(mongoose);

  // Model
  const Activity = mongoose.model("activity", schema);

  return Activity;
};

function _schema(mongoose){
    return mongoose.Schema({
        username: {
            type: Schema.Types.ObjectId,
            required: true
        },
        activity: {
            type: String,
            required: true
        },
        information: {
            type: String,
        },
        view: {
            type: Number,
            default: 0,
        },
        complete: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    });
}
