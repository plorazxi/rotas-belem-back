# Rotas Belém - Backend 📍

API desenvolvida em Node.js para gestão de rotas geoespaciais na cidade de Belém, utilizando PostgreSQL com a extensão PostGIS para armazenamento e manipulação de dados geográficos.

## 🚀 Tecnologias Utilizadas

* **Runtime:** Node.js (v20+)
* **Linguagem:** TypeScript
* **Framework Web:** Express
* **ORM:** Prisma (com suporte a extensões PostgreSQL)
* **Banco de Dados:** PostgreSQL + PostGIS
* **Containerização:** Docker & Docker Compose
* **Ferramentas:** tsx, Prisma Client

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Git](https://git-scm.com)
* [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
* [Node.js](https://nodejs.org/)

## 🛠️ Configuração do Ambiente

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd Rotas-Belem-Back
    ```

2.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto baseando-se no `.env.example`:
    ```env
    DATABASE_URL=""
    POSTGRES_USER=""
    POSTGRES_PASSWORD=""
    POSTGRES_DB=""
    POSTGRES_PORT=""
    ```

3.  **Suba os containers do banco de dados:**
    ```bash
    npm run up
    ```

4.  **Instale as dependências:**
    ```bash
    npm install
    ```

5.  **Execute as migrações do Prisma:**
    ```bash
    npx prisma migrate deploy
    npx prisma generate
    ```

## 🏃 Executando o Projeto

Para iniciar o servidor em modo de desenvolvimento com hot-reload:
```bash
npm run dev
```
O servidor estará disponível em http://localhost:3000.
📑 Documentação da API

Todas as rotas abaixo utilizam o prefixo /rotas.
1. Listar todas as rotas

Retorna uma lista com todas as rotas cadastradas e seu trajeto em formato GeoJSON.

    URL: /rotas

    Método: GET
    Resposta de Sucesso (200):
    JSON

    [
      {
        "id": 1,
        "nome": "Rota Exemplo",
        "trajeto_geojson": {
          "type": "LineString",
          "coordinates": [[-48.49, -1.45], [-48.48, -1.46]]
        }
      }
    ]

	2. Cadastrar nova rota

Salva uma rota no banco de dados. O campo trajeto deve ser um objeto GeoJSON do tipo LineString.

    URL: /rotas

    Método: POST

    Corpo da Requisição:
    JSON

    {
      "nome": "Caminho Centro-Ufpa",
      "trajeto": {
        "type": "LineString",
        "coordinates": [
          [-48.49018, -1.45502],
          [-48.48918, -1.45602]
        ]
      }
    }

3. Deletar uma rota

Remove uma rota existente pelo seu ID.

    URL: /rotas

    Método: DELETE

    Corpo da Requisição:
    JSON

    {
      "id": 1
    }

🐳 Docker (Aplicação)

Caso deseje buildar a imagem da própria API:
```Bash
	docker build -t rotas-belem-back:dev . 
```

