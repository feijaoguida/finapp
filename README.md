# 💰 Carteira Financeira - API NestJS

Este projeto é uma API de carteira financeira desenvolvida com **NestJS** e **PrismaORM**, permitindo que os usuários realizem transferências de saldo entre contas. A aplicação utiliza **SQLite** como banco de dados e oferece suporte a transações reversíveis.

## 🚀 Funcionalidades

- Cadastrar usuários.
- Sistema de Login usando JWT, Guardian e Passport.
- Criar contas de usuários.
- Transferir saldo entre contas.
- Validar saldo antes da transferência.
- Reverter transações em caso de inconsistência ou por solicitação do usuário.

---

## 🛠 Tecnologias Utilizadas

- [**NestJS**](https://nestjs.com/) - Framework para Node.js
- [**PrismaORM**](https://www.prisma.io/) - ORM para manipulação do banco de dados
- **SQLite** - Banco de dados leve para desenvolvimento

---

## 📥 Instalação e Configuração

### **1. Clonar o Repositório**

```bash
git clone https://github.com/feijaoguida/finapp.git
cd finapp
```

### **2. Instalar Dependências**

```bash
npm install
```

### **3. Configurar o Banco de Dados**

```bash
npx prisma migrate dev --name init
```

### **4. Iniciar o Servidor**

```bash
npm run start:dev
```

---

## 📡 Endpoints da API

### **1️⃣ Acesse o Link e Faça o Teste On-line**

``

- [**https://finapp-wallet.fly.dev/docs**](https://finapp-wallet.fly.dev/docs) - Hospedado no Fly.io.
- No repositorio tem contem um arquivo chamado requisicoes.http, por ele consegui fazer as chamadas a api local, usando a extenção para o VSCode REST Client

``

## 📄 Licença

Este projeto é de código aberto e está sob a licença **MIT**.

---

💡 **Dúvidas ou sugestões? Fique à vontade para contribuir!** 🚀
