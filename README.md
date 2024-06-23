# App com React + TypeScript + Vite para consumir a API de CRUD de Clientes e Usuários 

## Como Rodar o Projeto Localmente

1. Clone o repositório:

```
git clone https://github.com/FabianoMassignani/crud_clientes_app.git

```

2. Instale as dependências:

```
cd crud_clientes_app
npm install

```

3. Inicie o servidor de desenvolvimento da aplicação:

```
npm run dev

```

4. Abra o navegador e acesse a aplicação em:

```
http://localhost:5173
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

3. Abra o navegador e acesse a aplicação em:

```
http://localhost:5173
```