import Router, { IRouterParamContext } from "koa-router";
const suppliers = require('./test-data/suppliers.json');
import * as fs from 'fs';

//init
const healthRouter = new Router({ prefix: '/api' });
const data = {
  'texto': 'Bienvenido Candidato 01',
  'expressVersion': "1.0.1",
};

interface Proveedor {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
}

healthRouter.get("/", async (ctx) => {
  ctx.status = 200;
  ctx.body = data;
});

healthRouter.get("/suppliers", async (ctx) => {
  ctx.status = 200;
  ctx.body = suppliers.proveedores;
});

healthRouter.post("/suppliers", async (ctx) => {
  const nuevoProveedor = ctx.request.body;
  console.log('Datos JSON recibidos:', nuevoProveedor);
  
  let proveedores = suppliers;
  
   // Verificar si el proveedor ya existe por su ID
  if (isValidProveedor(nuevoProveedor, proveedores.proveedores)){
    ctx.status = 400; // Código de estado 400 para indicar una solicitud incorrecta
    ctx.response.body = { error: 'El proveedor ya existe.' };
  } else {
    proveedores.proveedores.push(nuevoProveedor)
    const proveedorJSON = JSON.stringify(proveedores);
    fs.writeFile('./test-data/suppliers.json', proveedorJSON, (err) => {
      if (err) {
        console.error('Error al guardar el proveedor:', err);
      } else {
        console.log('Proveedor guardado en proveedor.json');
      }
    });
    ctx.status = 201; // Código de estado 201 para indicar que se creó el recurso
    ctx.response.body = nuevoProveedor;
  }
});

healthRouter.put("/edit-suppliers", async (ctx) => {
  let proveedorEdit: unknown = ctx.request.body;
  
  //let proveedorEdit: unknown = ctx.request.body;
  console.log('Datos JSON recibidos:', proveedorEdit);
  
  let proveedores = suppliers;
  console.log("provedores: ", proveedores);

  console.log("Validacion: ", isValidProveedor(proveedorEdit, proveedores));
  
  // Verificar si el proveedor ya existe por su ID
  if (isValidProveedor(proveedorEdit, proveedores)){
    const proveedorRecibido: Proveedor = proveedorEdit as Proveedor;
    //const proveedor = proveedores.proveedores[proveedorRecibido.id];
    const proveedor = proveedores.proveedores.find((p: Proveedor) => p.id === proveedorRecibido.id);

    Object.assign(proveedor, proveedorRecibido);
    
    const proveedorJSON = JSON.stringify(proveedores);
    fs.writeFile('./test-data/suppliers.json', proveedorJSON, (err) => {
      if (err) {
        console.error('Error al guardar el proveedor:', err);
      } else {
        console.log('Proveedor guardado en proveedor.json');
      }
    });
    ctx.status = 200; // Código de estado 201 para indicar que se modifico el recurso
    ctx.response.body = proveedor;
    
  } else {
    ctx.status = 400; // Código de estado 400 para indicar una solicitud incorrecta
    ctx.response.body = { error: 'El proveedor no existe.' };
    
  }

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

// Función para validar si el objeto cumple con el tipo 'Proveedor'
function isValidProveedor(proveedor: any, proveedores: any) {
  if (proveedores.proveedores[proveedor.id])
    return true;
  return false;
}

export default healthRouter;