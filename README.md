# Projeto Blogs API

## Contexto

Este projeto é uma API para um Blog, além de um banco de dados. Usamos como exemplo a API do [Blogger](https://developers.google.com/blogger/docs/3.0). Nela, temos um CRUD de postagens com uma camada de autenticação de pessoas usuárias.
<br />

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

Foi desenvolvido uma API e um banco de dados para a produção de conteúdo para um blog!

Foi desenvolvido uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

  1. Os endpoints estão conectados ao banco de dados seguindo os princípios do REST;

  2. Para fazer um post é necessário usuário e login, portanto é trabalhada a **relação entre** `user` e `post`; 

  3. É necessária a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

Os seguintes endpoints foram utilizados:

- endpoint POST /login
- endpoint POST /user
- endpoint GET /user
- endpoint GET /user/:id
- endpoint POST /categories
- endpoint GET /categories
- endpoint POST /post
- endpoint GET /post
- endpoint GET /post/:id
- endpoint PUT /post/:id
- endpoint DELETE /post/:id
- endpoint DELETE /user/me
- endpoint GET /post/search?q=:searchTerm

</details><br />

<details>
  <summary><strong>Habilidades</strong></summary><br />

O conjunto de operações conhecido como CRUD (Create, Read, Update e Delete) constituem a forma mais básica de manipular dados. Apesar disso, boa parte das aplicações de mercado giram em torno dessas quatro operações. Neste projeto, foi implementado essas operações utilizando Node.js e sequelize.
</details><br />

## Executando aplicação

<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>
  
  ## 👉 Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  <br />
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`

  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - **✨ Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

  <br/>
</details>

<details>
  <summary  id="diagrama"><strong>🎲 Diagrama ER e Entidades</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  Para orientar a construção das tabelas através do ORM, foi utilizado o *DER* a seguir:

  ![DER](./images/der.png)

  ---

  #### Formato das entidades

  O projeto utilizou o `ORM Sequelize` para criar e atualizar o banco de dados. 

  Os primeiros passos do projeto foram orientar a produção das migrations para gerar:

  - Uma tabela chamada **users**, contendo dados com a seguinte estrutura:

    | id  | display_name    | email           | password | image                                                                                   |
    | --- | --------------- | --------------- | -------- | --------------------------------------------------------------------------------------- |
    | 1   | Brett Wiltshire | brett@email.com // tem quer ser único | 123456   | http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png |

  - Uma tabela chamada **categories**, contendo dados com a seguinte estrutura:

    | id  | name |
    | --- | ---- |
    | 18  | News |

  - Uma tabela chamada **blog_posts**, contendo dados com a seguinte estrutura:

    | id  | title                      | content                                                | user_id | published                | updated                  |
    | --- | -------------------------- | ------------------------------------------------------ | ------- | ------------------------ | ------------------------ |
    | 21  | Latest updates, August 1st | The whole text for the blog post goes here in this key | 14  // Chave estrangeira, referenciando o id de `users`    | 2011-08-01T19:58:00.000Z | 2011-08-01T19:58:51.947Z |

  - Uma tabela chamada **PostCategories**, contendo uma **chave primária composta** utilizando os dois atributos da estrutura:

    | post_id | category_id |
    | ------- | ----------- |
    | 50 // Chave primária e estrangeira, referenciando o id de `BlogPosts`     | 20  // Chave primária e estrangeira, referenciando o id de `Categories`     |


    *Os dados acima são fictícios, e estão aqui apenas como exemplo*
    
    ---

    #### Dicas de scripts prontos

    - Deleta o banco de dados:
    ```json
    "drop": "npx sequelize-cli db:drop"
    ```

    - Cria o banco e gera as tabelas:
    ```json
    "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
    ```

    - Insere dados/Popula a tabela:
    ```json
    "seed": "npx sequelize-cli db:seed:all"
    ```

<br />
</details>