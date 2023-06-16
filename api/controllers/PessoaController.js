const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices();

class PessoaController {

  static async pegaTodasAsPessoasAtivas(req, res) { // pode ser chamado sem chamar como new PessoasControle e salvar em constantes e afins, static --> chama direto
    try {
      const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos(); // findAll --> SELECT * FROM Matriculas WHERE estudante_id = 1 AND status = 'confirmado';

      return res.status(200).json(pessoasAtivas);
    } catch (error) {
      return res.send(500).json(error.message);  // 500 --> servidor
    }
  }

  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros(); // findAll --> select * from Pessoas (sql)

      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.send(500).json(error.message);  // 500 --> servidor
    }
  }

  static async pegaPessoaPorId(req, res) {
    const { id } = req.params;

    try {
      const pessoa = await pessoasServices.pegaUmRegistro({ id });

      if (!pessoa) {
        return res.status(404).json({ error: 'Person not found', message: `Nenhuma pessoa encontrada com o ID: ${id}` });
      }

      return res.status(200).json(pessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaPessoaPorNome(req, res) {
    const { term } = req.query;


    if (!term || term.length < 3) {
      return res.status(400).json({ message: "A busca deve ter no mínimo 3 caracteres" });
    }

    try {
      const pessoa = await pessoasServices.pegaRegistroPorNome(term, "nome")

      if (pessoa.length === 0) {
        return res.status(404).json({ message: `Nenhuma pessoa com o nome: '${term}' encontrado` });
      }

      return res.status(200).json(pessoa)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criarPessoa(req, res) {
    const novaPessoa = req.body; // infos do corpo da requisição

    try {
      const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);

      return res.status(200).json(novaPessoaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizarPessoa(req, res) {
    const { id } = req.params;
    const novasInfos = req.body; // infos do corpo da requisição

    try {
      await pessoasServices.atualizaRegistro(novasInfos, Number(id)) // update retorna 0 ou 1
      const pessoaAtualizada = await pessoasServices.pegaUmRegistro({ id })

      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletarPessoa(req, res) {
    const { id } = req.params;

    try {
      const pessoa = await pessoasServices.apagaRegistro(id)

      if (!pessoa) {
        return res.status(404).json({ error: 'Person not found', message: `Nenhuma pessoa encontrada com o ID: ${id}` });
      }

      return res.status(200).json({ message: `Usuario com id:'${id}' deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params;

    try {
      await pessoasServices.restauraRegistro(id)
      res.status(200).json({ message: `id ${id} restaurado` })
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // -=-=-= MATRICULAS -=-=-=-=

  static async pegaMatriculas(req, res) { // todas as matriculas de um estudante em especifico
    const { estudanteId } = req.params;

    try {
      const matriculas = await pessoasServices
        .pegaMatriculasPorEstudante({ id: Number(estudanteId) })
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async cancelaPessoa(req, res) { // se mudar o status da pessoa para cancelado, muda o status das inscricoes
    const { estudanteId } = req.params;

    try {
      await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId));

      return res.status(200).json({ message: `Matriculas ref. estudade ${estudanteId} canceladas ` })
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

}

module.exports = PessoaController;