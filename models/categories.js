const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema ({
    name:{
        type:String,
        required: true,
        unique: true

    },
    listings: [{
    type: Schema.Types.ObjectId,
    ref: "Listing"
}]
});

module.exports = mongoose.model("Category", categoriesSchema);