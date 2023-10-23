import koa from "koa";
import bodyparser from "koa-bodyparser";
import loggerKoa from "koa-logger";
import cors from "koa2-cors";
import mount from "koa-mount";
import auth from "koa-basic-auth";
import health from "./health";

//init
const app = new koa();

//middlewares
app.use(cors());
app.use(loggerKoa());
app.use(bodyparser());
app.use(mount("/health", auth({
    name: 'user',
    pass: 'password',
})));

//Routes
app.use(health.routes());

//export server
export default app;