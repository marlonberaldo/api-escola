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

  // matriculas sempre são vinculadas a uma pessoa, por isso não tem controller especificos ou router
  static async pegaUmaMatricula(req, res) {

    // localhost:8000/pessoas/:estudanteId/matricula/:matriculaId
    const { estudanteId, matriculaId } = req.params;

    try {
      const umaMatricula = await dataBase.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        }
      });

      if (!umaMatricula) {
        return res.status(404).json({ message: `Pessoa/ matricula não encontrada` });
      }

      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criarMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }; // infos do corpo da requisição

    try {
      const novaMatriculaCriada = await dataBase.Matriculas.create(novaMatricula); // cria registro no bancos

      return res.status(200).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body; // infos do corpo da requisição

    try {
      await dataBase.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        }
      }); // update retorna 0 ou 1
      const matriculaAtualizada = await dataBase.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          // estudante_id: Number(estudanteId),
        }
      })
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;

    try {
      await dataBase.Matriculas.destroy({ // IMPORTANTE PASSAR O WHERE CASO CONTRARIO SERÁ APAGADO TODO O BANCO KK
        where: {
          id: Number(matriculaId),
          // estudante_id: Number(estudanteId),
        }
      });

      return res.status(200).json({ message: `Matricula com id:'${matriculaId}' deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;

    try {
      await dataBase.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json({ mensagem: `id ${matriculaId} restaurado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }



  static async pegaMatriculasPorTurma(req, res) { // checar quantas matriculas temos em cada turma, e ver se esta lotada
    const { turmaId } = req.params;

    try {
      const todasAsMatriculas = await dataBase.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(turmaId),
          status: "confirmado", // pega todas as matriculas confirmadas
        },
        limit: 20, // util para paginacao, --> somente nas rows
        order: [['estudante_id', 'DESC']] // coluna
      });
      return res.status(200).json(todasAsMatriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaTurmasLotadas(req, res) { // saber se a turma está lotada ou não
    const lotacaoTurma = 2;

    try {
      const turmasLotadas = await dataBase.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attributes: ['turma_id'], // atributo do modelo que queremos trabalhar
        group: ['turma_id'], // junte o resultado checando o resultado da coluna
        having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`) // query sql em node com sequelize --> quantos matriculas sao maior que lotacao turma
      });
      return res.status(200).json(turmasLotadas.count)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

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