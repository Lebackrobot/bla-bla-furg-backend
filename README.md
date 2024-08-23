# 💬 bla-bla-furg-backend

Backend desenvolvido em NodeJs, seguindo o design pattern MVC para criação de chats através de endpoints SSE (Server Send Events). O backend possuí endpoints autenticados e não autenticados (`auth` e `noauth`). <br><br>
🔗 Deploy: https://bla-bla-furg-frontend.onrender.com

<br>

## 🗃️ Database
O database foi modelado com auxilio do ORM Prisma, utilizando PostegreSQL como SGBD.<br><br>

![Screenshot from 2024-07-31 00-44-41](https://github.com/user-attachments/assets/d703d54b-fcde-4c13-a9b8-60a2478ffa01)


## Rodando o backend

Para subir o servidor localmente, será necessário certificar de que o servidor o database PostgreSQL esteje rodando na porta default, 5432. Uma vez confirmado isso, basta instalar as dependências e rodar o projeto:

```shell
  npm install && npm start
```
