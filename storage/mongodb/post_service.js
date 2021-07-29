const Post = require("../../models/postmodel")
const Postes = require("../../models/Postesmodel")
const logger = require("../../config/logger")

let postService = {
    create: async (req) =>{
        if(!req){
            throw new Error("Post is required");
        }
        try {
            let post = new Post({
                id: req.id,
                title: req.title,
                body: req.body,
                author: req.author,
                createdAt: req.createdAt
            });
            try{
                const res = await Postes.save();
            } catch(error){
                throw new Error(error.message);
            }

            try {
                await Postes.insertMany([{post}]);
            } catch (error) {
                logger.error(
                    "Failed to insert document - rollback insert"
                );
                await Postes.deleteOne({ id: res.id });

                throw new Error(error.message);
            }

            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    get: async (req) =>{
        if(!req.id){
            logger.warn(`get has a request without id`);
            throw new Error("id is required to get post");
        }
        try{
            const respDB = await Postes.findOne({ id: req.id });
            if(!respDB){
                return {};
            }
            return respDB;
        }catch(err){
            throw new Error(err.message);
        }
    },
    getAll: async (req) =>{
        try{
            const respDB = await Postes.find();
            return respDB;
        } catch(err){
            throw new Error(err.message);
        }
    },
    update: async (req) =>{
        if(!req.id){
            logger.warn(`update has a request without id`);
            throw new Error("id is required to update post");
        }
        try{
            let post = await Postes.findOne({id: req.id});
            if(!post){
                throw new Error(`Post with this id is not found`);
            }
            let resp = await Postes.updateOne(
                {
                    id: req.id
                },
                {
                    $set: {
                        title: req.title,
                        body: req.body,
                        author: req.author,
                        created_at: req.created_at
                    }
                }
            );
            await post.save();
            return resp;
        } catch(err){
            throw new Error(err.message);
        }
    }
}

module.exports = postService;