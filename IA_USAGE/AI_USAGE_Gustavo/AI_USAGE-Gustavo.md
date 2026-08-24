# Registro de Uso de Inteligência Artificial

Este documento registra de forma transparente como utilizei ferramentas de Inteligência Artificial durante o desenvolvimento do projeto **Hub Universitário**.

Utilizei a IA como uma ferramenta de apoio para desenvolvimento, debugging e documentação. Todas as sugestões foram analisadas por mim antes de serem utilizadas, e eu continuei responsável pelas decisões técnicas e pelo código entregue.

---

## Ferramentas e Modelos Utilizados

| Ferramenta                Modelo                     | Finalidade                                  |
| ------------------------ | -------------------------- | ------------------------------------------- |
| Google Antigravity (IDE) | Claude Opus 4.6 (Thinking) | Auxílio em código, debugging e documentação |

---

## Registro de Uso por Etapa

### 1. Criação da Página de Dashboard

* **Data:** 22/08/2026
* **Etapa:** Desenvolvimento da funcionalidade — frontend
* **Objetivo:** Criar a página `DashboardPage.tsx` com KPIs e estatísticas das atividades.
* **Prompt/objetivo principal:** Solicitei auxílio para criar uma página de dashboard que apresentasse indicadores e estatísticas relacionadas às atividades do sistema.
* **Arquivos influenciados:** `DashboardPage.tsx` e componentes relacionados ao dashboard.
* **Resultado:** Sugestão **aceita e adaptada**. A IA me ajudou com a estrutura e a lógica dos componentes, mas revisei e adaptei o código de acordo com a estrutura e as necessidades do projeto.

### 2. Correção de Configurações do TypeScript

* **Data:** 22/08/2026

* **Etapa:** Debugging e correção de erros de build

* **Objetivo:** Corrigir o erro `Option 'tsBuildInfoFile' cannot be specified without specifying option 'incremental' or option 'composite'` e o valor inválido `ES2023` no campo `target`.

* **Prompt/objetivo principal:** Solicitei ajuda para identificar a causa dos erros de configuração do TypeScript e encontrar uma solução para os problemas encontrados.

* **Arquivos influenciados:**

  * `apps/frontend/tsconfig.app.json` — adicionei `"incremental": true`.
  * `apps/frontend/tsconfig.node.json` — adicionei `"incremental": true` e alterei `target` de `ES2023` para `ES2022`.

* **Resultado:** Sugestões **aceitas integralmente** após analisar as alterações e verificar o funcionamento do projeto.

* **Commits relacionados:**

  * `6f975af` — `chore: atualiza configurações do frontend e TypeScript`
  * `4e931e5` — `chore: atualiza configurações do frontend e TypeScript`

### 3. Documentação e Mensagens de Commit

* **Data:** 22/08/2026
* **Etapa:** Documentação e versionamento
* **Objetivo:** Criar documentação das alterações realizadas e sugerir mensagens de commit seguindo o padrão Conventional Commits.
* **Prompt/objetivo principal:** Solicitei auxílio para descrever as alterações realiza das e criar mensagens de commit seguindo o padrão utilizado no projeto.
* **Resultado:** Sugestões **aceitas e adaptadas**. Analisei as sugestões e fiz os ajustes necessários antes de utilizá-las.

---

## Processo de Revisão e Validação

Eu revisei todas as sugestões geradas pela IA antes de incorporá-las ao projeto.

1. **Compreensão:** Analisei cada sugestão para entender o que estava sendo alterado e o motivo da alteração.

2. **Revisão do código:** Conferi manualmente as alterações no editor antes de mantê-las no projeto.

3. **Validação:** Verifiquei as alterações nas configurações do TypeScript por meio do ambiente de desenvolvimento e do processo de compilação/build.

4. **Adaptação:** Quando necessário, alterei as sugestões da IA para que se encaixassem na estrutura e nas regras do projeto.

5. **Responsabilidade:** A decisão final de aceitar, adaptar ou rejeitar cada sugestão foi minha.

---

## Resumo do Uso da IA

| Etapa                  | Resultado            |
| ---------------------- | -------------------- |
| Criação do Dashboard   | Aceita e adaptada    |
| Correção do TypeScript | Aceita integralmente |
| Documentação e commits | Aceita e adaptada    |
| Sugestões rejeitadas   | Nenhuma registrada   |

---

## Responsabilidade pelo Resultado

Utilizei a Inteligência Artificial como uma ferramenta de apoio durante o desenvolvimento, mas continuo responsável por todo o conteúdo entregue no projeto.

Todo código sugerido pela IA foi revisado e validado por mim antes de ser utilizado. Também procurei compreender as alterações realizadas para conseguir explicar e justificar as decisões tomadas no projeto.
