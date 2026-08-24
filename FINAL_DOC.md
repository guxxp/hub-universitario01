# Hub Universitário — Documentação Final do Desenvolvimento

Este documento resume tudo o que foi investigado, corrigido, criado e evoluído no repositório `hub-universitario01` desde a criação do projeto (fork de `webtech-recrutamento/hub-universitario`) até o estado atual, organizado em ordem cronológica.

---

## Alunos:

- Alexandre Lacerda de Melo
- Ivo Villani Cunha
- Gustavo Henrique da Silva Ferreira
- Ryan Ferreira Barros

## Estado inicial do repositório (18/08/2026)

O repositório foi criado a partir do template do desafio, já com:

- Backend em Java 21 / Spring Boot, com as camadas `controller`, `service`, `repository`, `entity`, `dto`, `exception` e `config`.
- Frontend em React 19 / TypeScript / Vite, com páginas de listagem e detalhe de atividades, filtros por categoria, formulário de inscrição e consulta de participantes.
- Banco H2 em arquivo, com 12 atividades de demonstração pré-carregadas.
- Um produto funcional, porém com regras de negócio incompletas, comportamentos incorretos e partes do fluxo ainda não implementadas — conforme descrito no `PROJECT.md` e no `CHALLENGE.md`.

A partir daí, a equipe abriu 13 Issues (bugs e features) e 13 Pull Requests, todos já mesclados na `master`.

---

## 22/08/2026 — Primeira leva de correções e funcionalidades

### Dashboard de indicadores (PR #10, feature)
Criada a página `DashboardPage.tsx`, antes inexistente, apresentando KPIs e estatísticas das atividades: total de atividades, total de inscrições, vagas disponíveis, distribuição por status (abertas/lotadas/encerradas) e por categoria, com barras de progresso proporcionais.

### Validação de capacidade em atividades lotadas (PR #12, bug)
Corrigido um problema em que era possível ultrapassar a capacidade máxima de uma atividade ao se inscrever. O serviço de inscrição passou a validar `registeredCount` contra `capacity` antes de confirmar a inscrição, retornando um erro de conflito (`409`) em vez de permitir a inscrição indevida.

### Filtro por categoria "Cursos" (PRs #13, #14, #15)
Identificado um bug em que o filtro de categoria não exibia corretamente as atividades da categoria "Cursos". Uma primeira tentativa de correção (#13) causou regressão e foi revertida (#14); a correção definitiva foi aplicada em seguida (#15), restaurando o comportamento correto do filtro.

### Erro 404 para atividade inexistente (PR #16, bug)
Corrigida a resposta da API ao consultar uma atividade com identificador inexistente: em vez de um erro interno genérico, o backend passou a responder com `404 Not Found` e uma mensagem compreensível, alinhado à regra do `PROJECT.md` de que um recurso inexistente não deve ser tratado como falha interna do servidor.

### Busca de atividades sem chamada ao backend (PR #17, bug — alta prioridade)
A barra de busca da página de atividades não estava, de fato, enviando o termo pesquisado para a API — o filtro acontecia apenas visualmente, sem consultar o backend. Corrigido o envio do parâmetro `search` na chamada HTTP e a inclusão do termo na chave de cache do React Query, garantindo que a busca funcione corretamente mesmo com um catálogo maior de atividades.

### Documentação do comando no Windows (PR #18, documentação)
Corrigida a instrução de execução do backend no Windows no `README.md`, que estava com a sintaxe de comando incorreta para o ambiente.

### Validação de e-mail (PR #19, bug — baixa prioridade)
Identificado que tanto a validação do formulário (frontend) quanto a anotação `@Email` do backend aceitavam endereços sem domínio válido (ex.: `teste@t`), permitindo a criação de inscrições com e-mails claramente inválidos. Adicionada validação por expressão regular em ambas as camadas, exigindo domínio com ponto e extensão de pelo menos duas letras.

### Auto reload de disponibilidade (PR #20, feature)
Implementada atualização automática do número de inscritos e das vagas disponíveis na interface logo após uma inscrição bem-sucedida, sem exigir recarregamento manual da página — em conformidade com a regra de consistência da interface descrita no `PROJECT.md`. Também foi adicionada validação para rejeitar identificadores de atividade negativos ou zero.

---

## 23/08/2026 — Filtro de disponibilidade e estabilização de testes

### Filtro por disponibilidade de vagas (PR #23, feature)
Implementado um novo filtro na página de atividades, permitindo ao estudante filtrar por "Com vagas", "Cheias" ou "Encerradas", complementando o filtro por categoria já existente. A funcionalidade inclui os tipos, a lógica de filtragem, os botões de interface e testes unitários dedicados.

### Estabilização da suíte de testes do frontend (PR #25, bug)
Corrigido um teste do frontend que falhava por estar referenciando um índice incorreto em um array de dados de teste, restaurando a suíte de testes para o estado verde.

---

## 24/08/2026 — Cancelamento de inscrição

### Cancelamento de inscrição em atividade (PR #26, feature)
Até este ponto, era possível criar e listar inscrições, mas não havia nenhuma forma de cancelá-las — uma atividade que atingia a capacidade máxima (`FULL`) nunca voltava a ficar disponível, mesmo que um estudante desistisse.

Foi implementado:

- **Backend:** novo endpoint `DELETE /api/activities/{activityId}/registrations/{registrationId}`, que remove a inscrição, decrementa o contador de inscritos (nunca abaixo de zero) e reabre a atividade automaticamente (`FULL → OPEN`) quando uma vaga é liberada. Tentativas de cancelar uma inscrição ou atividade inexistente retornam `404` com mensagem compreensível.
- **Frontend:** como o produto não possui autenticação, o cancelamento é restrito à própria inscrição por meio de um rastreio local no navegador — o estudante só vê a opção de cancelar a inscrição que ele mesmo realizou naquele navegador. A antiga listagem pública com nomes e e-mails de todos os inscritos foi removida por motivo de privacidade, sendo substituída por um aviso simples ("Você já está inscrito nesta atividade") com um botão de cancelamento ao lado, com visual consistente com o restante da interface.

---

## Panorama geral

| Data | Itens entregues | Áreas |
| 18/08/2026 | Estado inicial do desafio | Backend, Frontend, Banco de dados |
| 22/08/2026 | 8 Pull Requests (dashboard, capacidade, filtro de categoria, 404, busca, documentação, e-mail, auto reload) | Backend e Frontend |
| 23/08/2026 | 2 Pull Requests (filtro de disponibilidade, estabilização de testes) | Frontend |
| 24/08/2026 | 1 Pull Request (cancelamento de inscrição) | Backend e Frontend |

Ao todo, 13 Issues foram abertas e fechadas, e 13 Pull Requests foram mesclados na `master`, cobrindo tanto correções de bugs (validação de capacidade, filtros, busca, tratamento de erro 404, validação de e-mail) quanto novas funcionalidades (dashboard de indicadores, atualização automática da interface, filtro por disponibilidade e cancelamento de inscrição).

## Estado atual do produto

- Catálogo de atividades com busca, filtro por categoria e por disponibilidade.
- Consulta de detalhes de uma atividade, incluindo tratamento correto de identificador inexistente.
- Inscrição com validação de nome e e-mail em ambas as camadas, respeitando a capacidade máxima.
- Cancelamento da própria inscrição, com reabertura automática da atividade quando aplicável.
- Interface que reflete o novo estado (inscritos, vagas, status) imediatamente após qualquer operação, sem recarregar a página.
- Dashboard com indicadores gerais das atividades cadastradas.
- Suíte de testes automatizados (backend e frontend) cobrindo os principais fluxos e regras de negócio.


