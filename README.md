# React + TypeScript + Vite

## Como Rodar o Projeto Localmente

1. Clone o repositório:

```
git clone https://github.com/FabianoMassignani/crud_clientes_app.git

```

2. Instale as dependências:

```
npm install

```

3. Inicie o servidor de desenvolvimento da aplicação:

```
npm run dev

```

## Rodar em container Docker

1. Crie a imagem do Docker:

```
docker build -t app .
```

2. Execute o container:

```
docker run -p 5173:5173 -d app
```