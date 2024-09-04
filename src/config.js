const { config } = require ("dotenv");

config();

// Configuración de conexión con el servidor
module.exports = {
    host: process.env.db_host,
    port: process.env.db_port,
    database: process.env.db_database,
    user: process.env.db_user,
    password: process.env.db_password,
    secretKey: process.env.secret_seed
}

/*
    Traemos todos los métodos de la librería dotenv, encargada de gestionar
    el archivo .env (instanciamos Base de Datos y traemos firma del token)
*/