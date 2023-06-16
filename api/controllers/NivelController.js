const { NiveisServices } = require('../services')
const niveisServices = new NiveisServices();

class NivelController {

  static async pegarTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await niveisServices.pegarTodosOsRegistros();

      return res.status(200).json(todosOsNiveis)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarNivelPorId(req, res) {
    const { id } = req.params
    try {
      const nivel = await niveisServices.pegaUmRegistro({ id })

      if (!nivel) {
        return res.status(404).json({ message: `Nenhum nível com o id: '${id}' encontrado` });
      }
      return res.status(200).json(nivel)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegarNivelPorNome(req, res) {
    const { term } = req.query;

    if (!term || term.length < 3) {
      return res.status(400).json({ message: "A busca deve ter no mínimo 3 caracteres" });
    }

    try {
      const niveis = await niveisServices.pegaRegistroPorNome(term, "descr_nivel") // filtrar por parciais da query completa

      if (niveis.length === 0) {
        return res.status(404).json({ message: `Nenhum nível com o nome: '${term}' encontrado` });
      }

      return res.status(200).json(niveis);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async criaNivel(req, res) {
    const novoNivel = req.body
    try {
      const novoNivelCriado = await niveisServices.criaRegistro(novoNivel)
      return res.status(200).json(novoNivelCriado)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaNivel(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await niveisServices.atualizaRegistro(novasInfos, id)
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaNivel(req, res) {
    const { id } = req.params
    try {
      await niveisServices.apagaRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraNivel(req, res) {
    const { id } = req.params
    try {
      await niveisServices.restauraRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} restaurado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}

module.exports = NivelController;