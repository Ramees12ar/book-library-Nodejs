import express from "express"
import cors from "cors"
import config from "config";
import bodyParser from "body-parser"
import apiRouter from "./router/routes.mjs";
import logger from "./logger.mjs";

const app = express()
app.use(cors({
    origin: "*",
    allowedHeaders: "X-Requested-With, authorization, Content-Type, Accept, Cache-Control, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent",
    methods: "GET,POST,PUT,DELETE",
    preflightContinue: false,
    maxAge: 36000,
    credentials: true,
}))
const { port } = config
const processApplication = async () => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.get("/",(req,res)=>{
        return res.send("<h3>Welcome to book library nodejs app</h3>")
    })
    app.use("/api", apiRouter)
    app.use((err, req, res, next) => {
        if (err) {
            return res.status(err.status).json({ error: err });
        }
        next(); // Pass control to the next middleware if no error occurred
    });
    process.on("unhandledRejection", (reason, p) => console.error("Unhandled Rejection at: Promise ", p, reason));
    app.listen(port, () => {
        logger.info(`App Started on port :: ${port} ${config.apiUrl}`);
    });
};

processApplication().then();

export default app;
