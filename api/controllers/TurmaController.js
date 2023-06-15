const { TurmasServices } = require("../services");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const turmasService = new TurmasServices(); // cria uma nova instancia de turmas

class TurmaController {

  static async pegarTodasAsTurmas(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {}; // cria o objeto da query vazio, pra nao ser algo obrigatorio

    data_inicial || data_final ? where.data_inicio = {} : null;
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const todasAsTurmas = await turmasService.pegarTodosOsRegistros(where);

      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegarTurmaPorId(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: `Parametro ${id} inválido. Deve ser um número inteiro.` });
    }

    try {
      const turmaPorId = await turmasService.pegaUmRegistro({ id })

      if (!turmaPorId) {
        return res.status(404).json({ message: `Turma com id '${id}' não encontrada` });
      }

      return res.status(200).json(turmaPorId)
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async criarTurma(req, res) {
    const novaTurma = req.body;

    // validação do tipo do body
    if (!novaTurma || typeof novaTurma !== 'object') {
      return res.status(400).json({ message: "Payload inválido" });
    }

    try {
      const novaTurmaCriada = await turmasService.criaRegistro(novaTurma);

      return res.status(201).json(novaTurmaCriada);
    } catch (error) {
      return res.status(500).json({ message: "Error creating Turma" });
    }
  }

  static async atualizarTurma(req, res) {
    const { id } = req.params;
    const novasInfosTurma = req.body;

    // Verificação de inputs e tipos
    if (isNaN(id)) {
      return res.status(400).json({ message: `Parametro ${id} inválido. Deve ser um número inteiro.` });
    }

    if (!novasInfosTurma || typeof novasInfosTurma !== 'object') {
      return res.status(400).json({ message: `Payload inválido` });
    }

    try {
      await turmasService.atualizaRegistro(novasInfosTurma, id)
      const turmaAtualizada = await turmasService.pegaUmRegistro({ id });

      return res.status(200).json(turmaAtualizada);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar a turma" });
    }
  }

  static async deletarTurma(req, res) {
    const { id } = req.params;

    // Validação de inputs
    if (isNaN(id)) {
      return res.status(400).json({ message: `Parametro ${id} inválido. Deve ser um número inteiro.` });
    }

    try {
      const turmaExiste = await turmasService.pegaUmRegistro({ id });

      if (!turmaExiste) {
        return res.status(404).json({ message: `A turma ${id} não existe.` });
      }

      await turmasService.apagaRegistro(id)
      return res.status(200).json({ message: "Nível deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: `Erro ao deletar a turma ${id}` });
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params
    try {
      await turmasService.restauraRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} restaurado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = TurmaController;
