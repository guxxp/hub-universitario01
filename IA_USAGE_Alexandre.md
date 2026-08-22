# Uso de Inteligência Artificial

Este documento declara o uso de ferramentas de IA no desenvolvimento deste repositório, conforme exigido pelo `CHALLENGE.md`.

## Ferramentas e modelos utilizados

- Claude Code (Anthropic), modelo Claude Sonnet 5, via CLI/agente integrado ao editor.

## Etapas em que a IA foi utilizada

- Investigação de um bug relatado na barra de busca da página de atividades (`/activities`).
- Explicação do fluxo de dados do projeto (frontend → backend → banco) para localizar a causa raiz do problema.
- Diagnóstico de um problema operacional durante a validação (backend rodando com bytecode antigo, sem hot-reload).
- Criação deste arquivo de documentação (`AI_USAGE.md`).
- Criação do commit com as alterações de código na branch `fix/SearchBar`.

## Resumo dos principais prompts/objetivos solicitados

- "A barra de busca do frontend não está fazendo a chamada para o backend ao realizar uma pesquisa" — pedido de investigação passo a passo (localizar componente, chamada de API, contrato do backend, comparação com o `PROJECT.md`) antes de qualquer alteração.
- Ajuste posterior: restringir temporariamente a busca a título e reverter para título + descrição, alinhado à regra descrita no `PROJECT.md`.
- Pedido de relatório consolidado de todas as mudanças feitas na sessão e seus motivos.
- Pedido para comitar apenas os arquivos de código alterados (sem tocar em documentação) na branch `fix/SearchBar`.

## Sugestões aceitas, adaptadas ou rejeitadas

- **Aceitas:** correção do envio do termo de busca ao backend (`activityService.ts`), inclusão do termo na `queryKey` do React Query (`useActivities.ts`), criação da query de busca no repositório JPA e uso dela no service (`ActivityRepository.java`, `ActivityService.java`).
- **Adaptada:** a IA propôs inicialmente que a busca considerasse título e descrição (conforme `PROJECT.md`); a pedido do participante, essa regra foi temporariamente restrita a "somente título" e, em seguida, revertida para "título + descrição" para manter a conformidade com a especificação do produto.
- **Rejeitada:** nenhuma sugestão foi descartada nesta sessão.

## Arquivos ou partes da solução influenciados

- `apps/frontend/src/services/activityService.ts` — envio do parâmetro `search` na chamada HTTP.
- `apps/frontend/src/hooks/useActivities.ts` — inclusão de `search` na `queryKey` do React Query.
- `apps/backend/src/main/java/br/edu/hub/repository/ActivityRepository.java` — novo método de consulta por título/descrição.
- `apps/backend/src/main/java/br/edu/hub/service/ActivityService.java` — uso condicional do novo método de busca.

Nenhum outro arquivo do projeto (filtros por categoria, entidades, controller, testes) foi alterado.

## Como o participante revisou e validou o resultado

- Leitura e conferência linha a linha de cada alteração sugerida antes de aplicá-la.
- Teste manual na interface (captura de tela da busca por "introd" filtrando corretamente as atividades).
- Verificação de que o backend precisava ser reiniciado para refletir as mudanças, e execução desse reinício.
- Validação de que a alteração não afetou o filtro por categoria nem outras funcionalidades da página.
- Revisão e aprovação explícita antes de qualquer commit ou push.
