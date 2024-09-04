/*
  index.js recibe como importación la configuración del app creado 
  funciona como responsable de ejecución de la app
*/
const app = require("./app");

const main = () => {
  app.listen(app.get("port"));
  console.log(`Server on port ${app.get("port")}`);
};

main();