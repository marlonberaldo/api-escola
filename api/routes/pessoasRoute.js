const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");
const MatriculaController = require('../controllers/MatriculaController')

const router = Router();

router
  .get("/pessoas", PessoaController.pegaTodasAsPessoas) // somente as pessoas com ativo : true
  .get("/pessoas/ativas", PessoaController.pegaTodasAsPessoasAtivas) // pega todas as pessoas sem constraints
  .get("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.pegaUmaMatricula)
  .get("/pessoas/:id", PessoaController.pegaPessoaPorId)
  .get("/pessoas/:estudanteId/matricula", MatriculaController.pegaUmaMatricula)
  .get("/pessoas/matricula/:turmaId/confirmadas", MatriculaController.pegaMatriculasPorTurma)
  .get("/pessoas/matricula/lotada", MatriculaController.pegaTurmasLotadas) // turmas lotadas

  .post("/pessoas/:estudanteId/matricula", MatriculaController.criaMatricula)
  .post("/pessoas", PessoaController.criarPessoa)
  .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)
  .post("/pessoas/:estudanteId/matricula/:matriculaId/restaura", MatriculaController.restauraMatricula)
  .post("/pessoas/:estudanteId/cancela", PessoaController.cancelaPessoa)

  .put("/pessoas/:estudanteId/matricula/:matriculaId", MatriculaController.atualizaMatricula)
  .put("/pessoas/:id", PessoaController.atualizarPessoa)

  // .delete("/pessoas/:estudanteId/matricula/:matriculaId", MatriculaController.deletarMatricula)
  .delete("/pessoas/:id", PessoaController.deletarPessoa)

module.exports = router;