const mongoose = require("mongoose");
const { v4 } = require("uuid");

let PostType = mongoose.Schema(
    {
        id: {
            type: String,
            default: v4,
            unique: true, 
        },

        title: {
            type: String
        },

        body:{
            type: String
        },

        created_at:{
            type: String
        },

        author: {
            type: String
        }
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

const PostTypeModel = mongoose.model("PostType", PostType);

module.exports = PostTypeModel;