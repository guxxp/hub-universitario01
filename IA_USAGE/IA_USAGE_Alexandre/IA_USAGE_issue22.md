# Registro de Uso de Inteligência Artificial — Alexandre Lacerda de Melo

Este documento declara o uso de ferramentas de IA no desenvolvimento deste repositório, conforme exigido pelo `CHALLENGE.md`.

## Ferramentas e modelos utilizados

- Claude Code (Anthropic), modelo Claude Sonnet 5, via CLI/agente integrado ao editor.

## Etapas em que a IA foi utilizada

- Levantamento de uma feature nova, a partir da análise do código existente (endpoints de inscrição sem operação de cancelamento).
- Redação do template da Issue da feature.
- Análise da estrutura do projeto e geração de um guia de implementação (arquivos, trechos atuais e trechos novos), sem a IA alterar nenhum arquivo diretamente.
- Diagnóstico de build quebrado após a aplicação manual das mudanças (dois métodos existentes haviam sido substituídos em vez de mantidos ao lado dos novos).
- Geração da correção para o build quebrado, com caminho exato de cada arquivo.
- Proposta e geração de código para restringir o cancelamento apenas à própria inscrição, dado que o produto não possui autenticação.
- Geração de código para remover a lista pública de participantes e substituí-la por um aviso "já inscrito" com botão de cancelar.
- Ajuste visual do botão de cancelar, reaproveitando o estilo já existente no projeto.

## Resumo dos principais prompts/objetivos solicitados

- Pedido de sugestão de feature nova coerente com o produto, seguido de pedido de template de Issue.
- "Analise a estrutura do projeto, mas não altere nem crie nenhum arquivo — me entregue apenas um guia de implementação" — para o endpoint de cancelamento de inscrição.
- "Gere o código e me aponte o caminho que irei conferir e corrigir" — para as correções de build.
- Pedido para restringir o cancelamento à própria inscrição, sem exigir login (fora do escopo do produto).
- Pedido para remover a lista de nomes e e-mails dos participantes, mostrando só o estado "já inscrito" com um botão ao lado.
- Pedido de ajuste visual do botão para reaproveitar o estilo do botão "Buscar" já existente.

## Sugestões aceitas, adaptadas ou rejeitadas

*(em todos os itens abaixo: código gerado pela IA, revisado e integrado por mim)*

- **Aceitas:** endpoint `DELETE /api/activities/{activityId}/registrations/{registrationId}`; método `decrementRegistrations()` na entidade `Activity`, reabrindo a atividade (`FULL → OPEN`) quando aplicável; rastreamento de "minhas inscrições" no `localStorage` do navegador (única alternativa viável sem sistema de autenticação); substituição da lista pública de participantes por um aviso individual com botão de cancelar; reaproveitamento da classe CSS `primary-button` para o botão.
- **Adaptada:** ao colar o código pela primeira vez, os métodos `list()` (backend) e `createRegistration`/`useCreateRegistration` (frontend) foram apagados por engano em vez de mantidos ao lado dos novos; a partir do diagnóstico da IA, apliquei manualmente a correção reintroduzindo esses métodos.
- **Rejeitada:** a sugestão inicial de exibir a lista com nomes e e-mails de todos os inscritos foi rejeitada por mim por motivo de segurança/privacidade dos usuários — optei por substituí-la por um aviso individual ("você já está inscrito") visível apenas para quem realizou a própria inscrição.

## Arquivos ou partes da solução influenciados

*(código gerado pela IA, revisado e integrado por mim em todos os itens abaixo)*

- `apps/backend/src/main/java/br/edu/hub/entity/Activity.java` — método `decrementRegistrations()`.
- `apps/backend/src/main/java/br/edu/hub/repository/RegistrationRepository.java` — método `findByIdAndActivityId`.
- `apps/backend/src/main/java/br/edu/hub/service/RegistrationService.java` — método `cancel(...)`.
- `apps/backend/src/main/java/br/edu/hub/controller/RegistrationController.java` — endpoint `DELETE`.
- `apps/frontend/src/services/activityService.ts` — função `cancelRegistration`.
- `apps/frontend/src/hooks/useActivities.ts` — hook `useCancelRegistration`.
- `apps/frontend/src/utils/myRegistrations.ts` — novo arquivo, rastreio local de inscrições.
- `apps/frontend/src/components/RegistrationForm.tsx` — exibição condicional "já inscrito" + botão de cancelar.
- `apps/frontend/src/pages/ActivityDetailsPage.tsx` — remoção da lista pública de participantes.
- `apps/frontend/src/styles.css` — regra `.notice.already-registered`.

## Como o participante revisou e validou o resultado

- Leitura e compreensão de cada trecho de código antes de implementar, incluindo o motivo da abordagem via `localStorage` (limitação declarada: sem contas de usuário, a marcação de "minha inscrição" é por navegador).
- Execução de `./mvnw clean compile` e `./mvnw test` (backend) e `npm run build` e `npx vitest run` (frontend) após cada rodada de mudanças, inclusive depois dos dois erros de build que foram introduzidos ao aplicar o código.
- Teste manual completo no navegador: inscrição, exibição do aviso "já inscrito", cancelamento, retorno do formulário, e confirmação de que a lista de nomes de outros participantes não fica mais visível.
- Decisão final de aceitar, corrigir ou ajustar cada sugestão foi minha em todas as etapas.