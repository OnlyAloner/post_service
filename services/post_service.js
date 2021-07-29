const grpc = require("@grpc/grpc-js");
const logger = require("../config/logger");
const Post = require("../storage/mongodb/post_service.js");


const postService = {
    Create: async(call, callback) => {
        logger.info(
            `create request`
        );
        try{
            const response = await Post.create(call.request);
            logger.info(`create request OK`);
            callback(null, response);
        } catch(err){
            logger.error(
                `create request FAILURE`
            );
            logger.error(
                `${error.message}`
            );
            callback({ code: grpc.status.INTERNAL, message: error.message });
        }
    },
    Get: async(call, callback) => {
        logger.info(
            `get request`
        );
        try{
            const response = await Post.get(call.request);
            logger.info(`get request OK`);
            callback(null, response);
        } catch(err){
            logger.error(
                `get request FAILURE`
            );
            logger.error(
                `${error.message}`
            );
            callback({ code: grpc.status.INTERNAL, message: error.message });
        }
    },
    GetAll: async(call, callback) => {
        logger.info(
            `getall request`
        );
        try{
            const response = await Post.getall(call.request);
            logger.info(`getall request OK`);
            callback(null, response);
        } catch(err){
            logger.error(
                `getall request FAILURE`
            );
            logger.error(
                `${error.message}`
            );
            callback({ code: grpc.status.INTERNAL, message: error.message });
        }
    },
    Update: async(call, callback) => {
        logger.info(
            `update request`
        );
        try{
            const response = await Post.update(call.request);
            logger.info(`update request OK`);
            callback(null, response);
        } catch(err){
            logger.error(
                `update request FAILURE`
            );
            logger.error(
                `${error.message}`
            );
            callback({ code: grpc.status.INTERNAL, message: error.message });
        }
    }

};

module.exports = postService;
