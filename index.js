const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader")
const mongoose = require("mongoose");

const logger = require("./config/logger.js");
const postService = require("./services/post_service.js")
const postes = require("./models/Postesmodel.js");
const PROTO_URL = 
    __dirname + "/proto/grpc.proto";
const packageDefinition = protoLoader.loadSync(PROTO_URL, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const postProto = grpc.loadPackageDefinition(packageDefinition)

function main(){
    logger.info("Main");

    let mongoDBUrl = "mongodb://localhost:27017/CRUDpost_service";
    logger.info("Connecting to db: " + mongoDBUrl);
    mongoose.connect(
        mongoDBUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },
        (err) => {
            if(err){
                logger.error(
                    "There is an error in connecting to db (" + 
                        mongoDBUrl +
                        "): " +
                        err.message
                );
                process.exit(1);
            }
        }
    );
    mongoose.connection.once("open", async function () {
        logger.info("Connected to the database");
    });

    var server = new grpc.Server();
    server.addService(
        postProto.PostService.service, postService
    );
    server.bindAsync(
        "0.0.0.0:50051",
        grpc.ServerCredentials.createInsecure(),
        (err, bindPort) => {
            if (err) {
                throw new Error("Error while binding grpc server to the port");
            }

            logger.info("grpc server is running at %s", bindPort);
            server.start();
        }
    );
}

main();
