# API REST - TO DO LIST

Este é um projeto de uma API RESTful para gerenciamento de tarefas (TodoList), desenvolvido com Node.js, Express, TypeScript e MySQL. A API permite a criação, leitura, atualização e exclusão de usuários, tarefas e subtarefas, além de fornecer uma documentação interativa via Swagger.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express.js**: Framework para construção de APIs e servidores HTTP.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **MySQL**: Banco de dados relacional.
- **TypeORM**: ORM (Object-Relational Mapper) para integração com o MySQL.
- **JWT (JSON Web Tokens)**: Autenticação segura de usuários.
- **Swagger**: Documentação da API com interface interativa para testes.

## Como Rodar o Projeto

### Requisitos

- **Node.js** (v16 ou superior)
- **MySQL** (instalado e configurado)
- **Yarn** ou **npm** (para gerenciar pacotes)

### Passos

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Anso-M/cros_todolist_api.git
   cd cros_todolist_api
   ```

2. **Instale as dependências**:
   Usando npm:
   ```bash
   npm install
   ```
   Ou usando yarn:
   ```bash
   yarn install
   ```

3. **Execute o script**:
   Na pasta ddl mysql, há um script mysql. Execute-o antes de rodar a API.

4. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   JWT_SECRET=<seu_segredo_jwt>
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=<seu usuário mysql>
   DB_PASSWORD=<senha do seu usuário mysql>
   DB_NAME=todo_app
   PORT=3333
   ```

5. **Execute a aplicação**:
   Usando npm:
   ```bash
   npm run dev
   ```
   Ou usando yarn:
   ```bash
   yarn dev
   ```

6. **Acesse a API**:
   A API estará disponível no endereço:
   ```
   http://localhost:3333/api
   ```

7. **Documentação Swagger**:
   Você pode acessar a documentação interativa do Swagger através da URL:
   ```
   http://localhost:3333/api-docs
   ```

### Autenticação

- Para acessar os endpoints que requerem autenticação, adicione um **Bearer Token** no header da requisição com o valor do JWT gerado após o login. Evidente que deva ter um usuário cadastrado para fazer login e usar os endpoints.
  - Exemplo:
    ```
    Authorization: Bearer <seu_token_aqui>
    ```

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
