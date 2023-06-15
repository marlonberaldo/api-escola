# API DE ESCOLA DE INGLÊS
  - Controle de pessoas, níveis, matrículas e turmas

# Instalação das dependências:
  - npm install sequelize sequelize-cli pg express nodemon

# Configuração da conexão com o banco de dados:
  - criaçao do arquivo config.json

# Criação do modelo:
  ```
    npx sequelize-cli model:create --name Matriculas --attributes status:string
  ```
  - arquivos serão gerados na pasta models, local onde definimos os modelos com seus atributos, regras, tratamentos

# Criação da migração: 
  Execute o seguinte comando para gerar um arquivo de migração:
  ```
     npx sequelize-cli migration:generate --name nome-da-migracao
  ```
  - Edite o arquivo gerado em migrations/timestamp-nome-da-migracao.js e defina as alterações do esquema do banco de dados.

# Execução das migrações:
  ```
    npx sequelize-cli db:migrate
  ```
  - Isso criará as tabelas e colunas definidas nas migrações.

# Consultas e manipulação de dados:
  - Use os métodos fornecidos pelo Sequelize (como create, findAll, update, destroy) para realizar operações de consulta e manipulação de dados nos modelos (nos controllers, juntamente com os services)


## ESTRUTURAL ##

- Controllers:

  - Os controllers são responsáveis por lidar com as requisições HTTP recebidas pela API.
  - Eles recebem os dados da requisição, interagem com os serviços apropriados e retornam as respostas adequadas.
  - Os controllers geralmente lidam com a lógica de negócio de alto nível e chamam os serviços correspondentes para executar operações específicas.

- Services:

  - Os services são responsáveis por conter a lógica de negócio da aplicação.
  - Eles fornecem funções e métodos reutilizáveis que encapsulam a lógica específica da aplicação.
  - Os services geralmente lidam com a interação direta com os modelos e realizam operações complexas e processamento de dados.

- Routers:

  - Os routers são responsáveis por definir as rotas da API e mapear as requisições HTTP para os controllers apropriados.
  - Eles determinam qual controller será responsável por tratar uma determinada rota e método HTTP (GET, POST, PUT, DELETE, etc.).
  - Os routers ajudam a organizar e estruturar as diferentes partes da API, permitindo a separação de responsabilidades e a escalabilidade.
