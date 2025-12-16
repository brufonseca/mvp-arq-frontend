# 🚀 MVP Arquitetura de Software – Frontend

Bem-vinda(o) ao repositório do **MVP Arquitetura de Software – Frontend**!  
Este projeto tem como objetivo implementar a interface de um *Diário de Introdução Alimentar e Buscador de Receitas*.

Ele se comunica com o backend Flask através de REST, com toda a aplicação rodando em containers independentes via Docker.



---
## 📊 Fluxograma

> **Cenário implementado: Cenário 1.1**

<img width="800" height="382" alt="image" src="https://github.com/user-attachments/assets/e20f2030-9094-47c0-9a11-b66c44dee8ad" />


---
## ✨ Tecnologias Utilizadas

### 🔹 Lit (Web Components)  
https://lit.dev/

### 🔹 Vite ⚡  
https://vitejs.dev/

### 🔹 pnpm 📦  
https://pnpm.io/

### 🔹 Material Web Components 🎨  
https://material-web.dev/

### 🔹 Docker 🐳  
https://docs.docker.com/

---

## 🛠️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- **Node.js** (v18+ recomendado) → https://nodejs.org/  
- **pnpm** (gerenciador de pacotes) → https://pnpm.io/  
- **Docker** (para rodar o projeto em containers) → https://docs.docker.com/
- **Docker Compose** (geralmente incluso no Docker Desktop)

---

## 🧱 Arquitetura do Projeto

### 🔗 Comunicação com o Backend (REST API)

A comunicação com o backend é feita através de **REST**, enviando e recebendo dados em **JSON**.  
O frontend conversa com o backend Flask por meio de endpoints organizados, rodando em containers separados dentro do ambiente Docker.

---

## ▶️ Como Rodar o Projeto 


### 🔹 Clonar o repositório
   ```bash
   git clone https://github.com/brufonseca/mvp-arq-frontend.git
   cd mvp-arq-frontend
   ```


### 💻 Execução em Modo de Desenvolvimento


Na raiz do repositório:
   ```bash
   pnpm install
   pnpm dev
   ```

Acesse no navegador:
👉 http://localhost:5173


### 🐳 Docker

### 🔹 Rodando apenas o Frontend com Docker

`Ideal quando o backend já está rodando separadamente.`

**Os comandos a seguir devem ser executados na raiz do repositório e com privilégios de administrador ou usuário pertencente ao grupo docker**

Construção da imagem Docker
   ```bash
   docker build -t mvp-arq-frontend .  
   ```

Execução do container
   ```bash
   docker run -p 5173:8080 mvp-arq-frontend
   ```

Acesse no navegador:
👉 http://localhost:8080/


### 🐳 Docker Compose (Frontend + Backend)

Este projeto inclui um arquivo **docker-compose.yml** na raiz do projeto, responsável por subir **tanto o frontend quanto o backend** juntos.  
Isso facilita o desenvolvimento e garante que os dois serviços conversem corretamente dentro da mesma rede Docker.

**Os comandos a seguir devem ser executados na raiz do repositório e com privilégios de administrador ou usuário pertencente ao grupo docker**

Executar toda a stack
```bash
docker compose up --build
```

Após subir:

Frontend → http://localhost:8080

Backend Flask → http://localhost:5000 (porta definida no docker-compose.yml) 



  






