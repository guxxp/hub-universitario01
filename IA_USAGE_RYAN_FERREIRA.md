# Uso de Inteligência Artificial

Este documento detalha o uso de ferramentas de Inteligência Artificial durante a resolução do desafio do Hub Universitário, garantindo transparência no processo de desenvolvimento.

## Ferramentas e Modelos Utilizados
- **Gemini (Google):** Assistente conversacional utilizado para estruturação do fluxo de trabalho, boas práticas de Git e documentação.

## Etapas de Utilização
- Mapeamento inicial do processo de trabalho e criação de backlog.
- Estruturação e padronização das descrições de Issues e Pull Requests.

## Principais Prompts e Objetivos
- "Como estruturar o fluxo de Issues e Pull Requests garantindo rastreabilidade?"
- "Qual o modelo ideal de Pull Request para atender aos critérios de qualidade do desafio?"

## Sugestões Aceitas, Adaptadas ou Rejeitadas
- **Aceitas:** O modelo de PR com rastreabilidade automática (uso do `Closes #`). A separação rigorosa de fluxo via branches `fix/` e `feat/`.

## Arquivos Influenciados
- Templates de Pull Request e Issues no GitHub.
- Este próprio arquivo `AI_USAGE.md`.

## Revisão e Validação
Todo conselho de fluxo foi cruzado com os requisitos do documento `CHALLENGE.md`. Para códigos e testes [SE APLICÁVEL], a validação foi feita garantindo a compreensão total do time sobre a implementação. O código passou por linting, validação humana no code review e execução da suíte de testes (`./mvnw test` e `npm test`) para atestar que os fluxos existentes não foram quebrados.
