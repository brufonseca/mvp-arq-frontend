# 🚀 MVP Arquitetura de Software – Frontend

Bem-vinda(o) ao repositório do **MVP Arquitetura de Software – Frontend**!  
Este projeto tem como objetivo implementar a interface de um *Diário de Introdução Alimentar e Buscador de Receitas*

---

## ✨ Tecnologias Utilizadas

### 🔹 Lit (Web Components)
### 🔹 Vite ⚡
### 🔹 pnpm 📦
### 🔹 Material Web Components 🎨  
### 🔹 Docker 🐳 

---

## 🛠️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- **Node.js** (v18+ recomendado) → https://nodejs.org/  
- **pnpm** (gerenciador de pacotes) → https://pnpm.io/  
- **Docker** (para rodar o projeto em containers) → https://docs.docker.com/  

---

## 🧱 Arquitetura do Projeto

O frontend é baseado em Web Components usando **Lit**, com **Vite** como ferramenta de build e dev server.  


### 🔗 Comunicação com o Backend (REST API)

A comunicação com o backend é feita através de **REST**, enviando e recebendo dados em **JSON**.  
O frontend conversa com o backend Flask por meio de endpoints organizados, rodando em containers separados dentro do ambiente Docker.

---

## ▶️ Como Rodar o Projeto em modo de Desenvolvimento

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/brufonseca/mvp-arq-frontend.git
   cd mvp-arq-frontend
   ```

2. **Executar na raiz do repositório**
   ```bash
   pnpm install
   pnpm dev
   ```

Para a acessar o frontend, abrir o navegador de sua escolha e digitar http://localhost:5173


## 🐳 Rodando com Docker

**Os comandos a seguir devem sr executados na raiz do repositório**

  






