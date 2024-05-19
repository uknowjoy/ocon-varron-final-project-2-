module.exports = (mongoose) => {

    // Schema
    const schema = _schema(mongoose)

    // Model
    const Blacklist = mongoose.model("blacklist", schema);

    // Model functions
    // ...
    
    return Blacklist;
};

/**
 * Create schema
 */
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