const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  // Schema
  const schema = _schema(mongoose);

  // Model
  const Comment = mongoose.model("comment", schema);

  // Model functions
  // ...

  return Comment;
};

/**
 * Create schema
 */
function _schema(mongoose){
    return mongoose.Schema({
        username: {
            type: Schema.Types.ObjectId,
            required: true
        },
        activityId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        comment: {
            type: String,
        }
    }, {
        timestamps: true
    });
}