const mongoose = require("mongoose");
const { v4 } = require("uuid");

let PostesType = mongoose.Schema(
    {
        PostType: [
            {
                id: {
                type: Number, 
                default: 0 
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
            }
        ],
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

const PostesTypeModel = mongoose.model("PostesType", PostesType);

module.exports = PostesTypeModel;