const { Router } = require("express");
const NivelController = require("../controllers/NivelController")

const router = Router();

router
  .get("/niveis", NivelController.pegarTodosOsNiveis)
  .post("/niveis", NivelController.criaNivel)
  .post('/niveis/:id/restaura', NivelController.restauraNivel)
  .get("/niveis/nome", NivelController.pegarNivelPorNome) // by query 
  .get("/niveis/:id", NivelController.pegarNivelPorId)
  .put("/niveis/:idNivel", NivelController.atualizaNivel)
  .delete("/niveis/:id", NivelController.apagaNivel)

module.exports = router;
