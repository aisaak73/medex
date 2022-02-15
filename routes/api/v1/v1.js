const express =  require('express');
const router = express.Router();
const {verifyApiHeaderToken} = require("./headerVerifyMiddleware");

const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');

//pacientes
router.use(
    '/pacientes',
    verifyApiHeaderToken,
    pacientesRoutes
);

//expedientes
router.use(
    '/expedientes',
    verifyApiHeaderToken, 
    expedientesRoutes
);

module.exports = router;