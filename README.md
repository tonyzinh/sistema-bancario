# Sistema Bancário - Gestão de Clientes, Contas e Agências

## 📚 Descrição

Este projeto é um sistema web desenvolvido em **React** + **TypeScript** para gestão de clientes, contas bancárias e agências. Permite visualizar, buscar e detalhar informações de clientes, suas contas e as agências vinculadas. O sistema é responsivo e utiliza boas práticas de organização de código.

> **Ideia futura:**  
> Incluir um mini mapa na aba de detalhes da agência, exibindo a localização do endereço cadastrado. A ideia é utilizar a API do Google Maps ou similar, facilitando a visualização geográfica para o usuário.  
> **Esta funcionalidade ainda não está implementada.**

Acesso ao Projeto: https://sistema-bancario-mu.vercel.app

---

## 🚀 Instalação

### Pré-requisitos

- Node.js (v16+)
- npm ou yarn

### Passos para rodar o projeto

1. **Clone o repositório**
   
   ```bash
   git clone https://github.com/tonyzinh/sistema-bancario.git
   cd sistema-bancario
   ```
2. **Instale as dependências**
   
   ```bash
   npm install
   ou
   yarn install
   ```
3. **Inicie o servidor**
   
   ```bash
   npm run dev
   ```
4. **Acesse no navegador**
   ```bash
   http://localhost:5173
   ```
   
---

## 🛠️ Bibliotecas Principais

- [React](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Vite](https://vitejs.dev/)  
- [React Router DOM](https://reactrouter.com/)  
- [TailwindCSS](https://tailwindcss.com/)  
- [Shadcn/UI](https://ui.shadcn.com/)  
- [Lucide React](https://lucide.dev/)  

---

## 💡 Como funciona

- **Home:** Lista todos os clientes e permite busca por nome ou CPF/CNPJ.
- **Detalhes do Cliente:** Mostra informações completas do cliente, suas contas e a agência vinculada.
- **Detalhes da Agência:** Exibe os dados da agência do cliente.

---

## 🔮 Próximos Passos

- [ ] Implementar integração com API de mapas (Google Maps ou OpenStreetMap) para mostrar o mini mapa na aba de agência.
- [ ] Permitir cadastro e edição de clientes e agências.
- [ ] Melhorar testes automatizados.

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 🤝 Contribua

Sugestões, issues e pull requests são bem-vindos!
