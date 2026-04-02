# 🎮 LoL Stats Tracker

Uma aplicação Full-Stack desenvolvida para buscar e exibir estatísticas de jogadores de League of Legends utilizando a API oficial da Riot Games. O sistema permite pesquisar um invocador através do seu Riot ID (Nome + Tag) e retorna os detalhes da sua última partida, salvando o histórico de buscas em um banco de dados.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído dividindo as responsabilidades entre um backend robusto em Java e uma interface moderna e responsiva em React.

**Frontend:**
* React.js (com Vite para build ultrarrápido)
* CSS3 customizado com tema inspirado no design do League of Legends
* Integração via `fetch` API

**Backend:**
* Java 21
* Spring Boot (Web, JPA)
* H2 Database (Banco de dados em memória para testes rápidos)
* Jackson (`tools.jackson`) para desserialização segura de JSON
* Springdoc / Swagger para documentação da API

**Integrações:**
* Riot Games API (Endpoints de Account e Match V5)

## ✨ Funcionalidades

- **Busca de Invocadores:** Integração em três etapas com a Riot API para converter o Riot ID em PUUID, buscar o ID da última partida e, finalmente, extrair os detalhes.
- **Extração de Dados:** Cálculo de Kills, Deaths, Assists (KDA) e resultado da partida (Vitória/Derrota).
- **Persistência de Dados:** Toda busca bem-sucedida é salva automaticamente no banco de dados H2.
- **Proteção de Cors:** Backend configurado para permitir requisições seguras do frontend local.

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
* [Java JDK 21+](https://jdk.java.net/21/)
* [Node.js](https://nodejs.org/en/)
* Uma chave de desenvolvedor válida da [Riot Games](https://developer.riotgames.com/)

### 1. Rodando o Backend (Spring Boot)

Abra o terminal na pasta `backend` e exporte a sua chave da Riot Games como uma variável de ambiente:

**No PowerShell (Windows):**
```bash
$env:RIOT_KEY="RGAPI-sua-chave-aqui"

**No Bash:**
export RIOT_KEY="RGAPI-sua-chave-aqui"

Em seguida inicie o servidor
./mvnw spring-boot:run

 2.Rodando o Frontend (React)
Abra um novo terminal na pasta frontend (onde está o arquivo package.json) e instale as dependências:

**No Bash:**
npm install
Inicie o servidor de desenvolvimento:

**No Bash:**
npm run dev
A interface ficará disponível no seu navegador, geralmente no endereço http://localhost:5173.

Desenvolvido por Kaike.