# Rest API Backend structure

## Resumo

Este projeto é um backend para uma aplicação de gerenciamento de tarefas. Ele utiliza o framework Fastify, o ORM Prisma e o TypeScript para fornecer uma API RESTful para criar, ler, atualizar e excluir tarefas.

O projeto contém 
- Um sistema de autenticação com JWT. (Token Based Authentication).
- Swagger automático na rota '/docs'.
- Registro de rotas automático dentro do diretório Routes.
- Middleware para captura e tratamento de erros.
- Regra de negócio dentro de '/schemas'.

# Tecnologias Principais

- Fastify – Framework web rápido e low overhead.
- Zod – Schema validation e tipagem estática.
- Prisma – ORM para banco de dados relacional.
- TypeScript – Tipagem estática para maior segurança em tempo de desenvolvimento.

## Estrutura de Diretorios

``` bash
.
├── prisma/           # Gerenciamento do banco de dados (schema.prisma, migrations)
├── src/
│   ├── app.ts        # Arquivo principal que inicializa o servidor Fastify
│   ├── infra/        # Infraestrutura: segurança, middlewares, sistema de erros
│   ├── lib/          # Bibliotecas auxiliares (ex: prisma.ts, registrador de rotas)
│   ├── schemas/      # Schemas Zod e regras de negócio
│   └── routes/       # Definição de rotas do aplicativo
├── tests/            # Testes automatizados da aplicação
├── package.json
├── tsconfig.json
└── README.md

```


## Testes

Todos os testes automatizados estão no diretório tests/. Você pode rodá-los com:
``` bash
pnpm test
```
