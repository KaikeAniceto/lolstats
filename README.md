# 🎮 LoL Stats Tracker

Uma aplicação Full-Stack desenvolvida para buscar e exibir estatísticas de jogadores de League of Legends utilizando a API oficial da Riot Games. O sistema permite pesquisar um invocador através do seu Riot ID (Nome + Tag) e retorna os detalhes da sua última partida, salvando o histórico de buscas em um banco de dados.

## 🛠️ Tecnologias Utilizadas

**Frontend:**
* React.js (com Vite para build ultrarrápido)
* CSS3 customizado com tema inspirado no design do League of Legends
* Integração via `fetch` API

**Backend:**
* Java 21
* Spring Boot (Web, JPA)
* H2 Database (Banco de dados em memória para testes rápidos)
* Jackson para desserialização segura de JSON
* Springdoc / Swagger para documentação da API

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você vai precisar ter instalado:
* [Java JDK 21+](https://jdk.java.net/21/)
* [Node.js](https://nodejs.org/en/)
* Uma chave válida da [Riot Games](https://developer.riotgames.com/)

### 1. Rodando o Backend (Spring Boot)

Abra o terminal na pasta `backend` e exporte a sua chave da Riot Games:

**No PowerShell (Windows):**
```bash
$env:RIOT_KEY="RGAPI-sua-chave-aqui"
```

**No Bash (Linux/Mac/Git Bash):**
```bash
export RIOT_KEY="RGAPI-sua-chave-aqui"
```

Em seguida, inicie o servidor:
```bash
./mvnw spring-boot:run
```
O Swagger ficará disponível em: `http://localhost:8080/swagger-ui/index.html`

### 2. Rodando o Frontend (React)

Abra um novo terminal na pasta `frontend` e instale as dependências:
```bash
npm install
```

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
A interface ficará disponível em `http://localhost:5173`.