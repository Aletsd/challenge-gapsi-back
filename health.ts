import Router, { IRouterParamContext } from "koa-router";
const suppliers = require('./test-data/suppliers.json');
//init
const healthRouter = new Router();
const data = {
  'texto': 'Bienvenido Candidato 01',
  'expressVersion': "1.0.1",
};

healthRouter.get("/", async (ctx) => {
  ctx.status = 200;
  ctx.body = data;
});

healthRouter.get("/suppliers", async (ctx) => {
  ctx.status = 200;
  ctx.body = suppliers.proveedores;
});

healthRouter.get("/health", async (ctx) => {

  ctx.status = 200;
  ctx.body =  {
    nodeVersion: process.version,
    service: 'TypeScriptNode',
    memory: process.memoryUsage(),
    pid: process.pid,
    uptime: process.uptime(),
    environment: 'dev',
    appVersionPackage: "1.0.0",
    };
});


export default healthRouter;