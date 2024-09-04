const jwt = require("jsonwebtoken");
const config = require("../config");
const { response, request, next } = require("express");

const authenticateJWT = (req = request, res = response, next = next) => {
    // authorization: contiene el token
    const authHeader = req.headers["authorization"];

    /*
        Hacemos un split para dividir el token del segundo index obtenido
        desde el array, el cual contiene el dato
    */
    const token = authHeader && authHeader.split(" ")[1];

    // Si no se reconoce un token, devolverá error 401
    if (token == null) return res.sendStatus(401);

    // verify: verifica que el token y la "firma" de la BD
    jwt.verify(token, config.secretKey, (err, user) => {
        // 
        if (err) return res.sendStatus(403);
        
        // Guarda al usuario en el request para usar en rutas protegidas
        req.user = user;
        
        // Pasamos al siguiente middleware o ruta
        next();
    })
}

// Gestionamos el creado del token, como párametro solicitamos al usuario
const generateJwt = async (user) => {
    // Generamos el paylaod con la información del usuario
    const payload = {
        sub: user.id,
        username: user.username,
        name: user.nombre
    }

    // Le damos una validez al token de 24 horas
    const options = {
        expiresIn: "24h",
    }

    return jwt.sign(payload, config.secretKey, options);
}

module.exports = { authenticateJWT, generateJwt };