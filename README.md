# 🌍 Around The U.S. - Full Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## 📋 Sobre o Projeto

O **Around The U.S.** é uma aplicação web Full Stack onde os usuários podem compartilhar e explorar seus lugares favoritos pelo mundo. Este projeto foi desenvolvido como requisito final do bootcamp de Desenvolvimento Web, unindo um front-end moderno em React a um back-end robusto em Node.js, com persistência de dados em MongoDB.

### 🔗 Links do Projeto

- **🌐 Site em Produção (Vercel):** [Clique aqui para acessar](https://web-project-api-full-lake.vercel.app/)
- **⚙️ API Backend (Render):** [Clique aqui para acessar](https://web-project-api-full-lake.vercel.app/)

> **Nota:** Como o backend está hospedado no plano gratuito da Render, a primeira requisição ao entrar no site pode levar até 50 segundos para responder (Cold Start). As requisições seguintes serão instantâneas.

---

## 🚀 Funcionalidades

- **Autenticação de Usuário:** Cadastro e login seguros utilizando **JWT (JSON Web Tokens)**. As senhas são criptografadas no banco de dados usando `bcryptjs`.
- **Gerenciamento de Perfil:** O usuário pode atualizar seu nome, descrição ("about") e foto de perfil.
- **Galeria Dinâmica:** Criação e exibição de cartões contendo o nome do local e uma imagem.
- **Interação:** Sistema de curtir/descurtir cartões. Os cartões curtidos pelo usuário logado são destacados visualmente.
- **Segurança e Permissões:** O usuário só pode deletar os cartões que ele mesmo criou (validação feita via backend).
- **Validação de Dados:** Uso da biblioteca **Celebrate (Joi)** para garantir que os dados enviados à API estejam no formato correto.
- **Tratamento de Erros e Logs:** Middleware centralizado de erros e logs de requisições/erros usando **Winston** (gerando arquivos `request.log` e `error.log`).

---

## 🛠️ Tecnologias Utilizadas

### Front-end

- **React** (com Hooks e Context API)
- **Vite** (Build tool)
- **React Router DOM** (Navegação e rotas protegidas)
- **CSS3** (Metodologia BEM)

### Back-end

- **Node.js** e **Express.js**
- **MongoDB** e **Mongoose** (Modelagem de dados)
- **JWT** e **bcryptjs** (Autenticação e segurança)
- **Celebrate** (Validação de rotas)
- **Winston** e **Express-Winston** (Logs)

---

## 📁 Estrutura do Repositório

```text
web_project_api_full/
├── backend/         # API Node.js/Express e conexão com MongoDB
└── frontend/        # Aplicação React/Vite
```
