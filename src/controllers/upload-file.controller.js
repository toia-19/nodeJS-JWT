const { request, response } = require("express");
const { uploadFiles } = require("../helpers/uploader");

// La constante guarda el "posteo" del archivo
const postFile = async (req = request, res = response) => {
    try {
        // Guarda ID recibido
        const id = req.params.id;

        // req.files = obtiene los archivos y comprobamos que no sea vacío("!")
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
            // Si no existe el archivo
            res.status(204).send("Archivos no subidos");
            return;
        }

        // Obtiene el nombre de archivo y lo ensambla al objeto
        const img_id = await uploadFiles(req.files);

        // Crea el objeto
        const record = { img_id: img_id };
    } catch (err) {
        console.error(err);
        res.status(404).json({ok: false, err});
    }
};

module.exports = { postFile };