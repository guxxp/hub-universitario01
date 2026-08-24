# Registro de Uso de Inteligência Artificial — Alexandre Lacerda de Melo

Este documento declara o uso de ferramentas de IA no desenvolvimento deste repositório, conforme exigido pelo `CHALLENGE.md`.

## Ferramentas e modelos utilizados

- Claude Code (Anthropic), modelo Claude Sonnet 5, via CLI/agente integrado ao editor.

## Etapas em que a IA foi utilizada

- Investigação de um bug: e-mails sem domínio válido (ex.: `teste@t`) eram aceitos como inscrição válida tanto pelo formulário quanto pela API.
- Explicação da causa raiz, comparando o comportamento padrão do `type="email"` (HTML) e da anotação `@Email` (Hibernate Validator) no backend.
- Geração da correção nas duas camadas (frontend e backend).

## Resumo dos principais prompts/objetivos solicitados

- "Por que um e-mail como `teste@t` está sendo aceito como válido, tanto no formulário quanto pela API, e gerando uma inscrição de verdade no banco?" — pedido de investigação da causa raiz antes de qualquer alteração.
- Pedido de correção cobrindo as duas camadas (frontend e backend), reaproveitando o tratamento de erro já existente no projeto.

## Sugestões aceitas, adaptadas ou rejeitadas

- **Aceitas** *(código gerado pela IA, revisado e integrado por mim)*: adição de `regexp` na anotação `@Email` do backend, exigindo domínio com ponto e extensão de 2+ letras; adição do atributo `pattern` no input de e-mail do frontend, bloqueando o envio no navegador antes de chamar a API.
- **Adaptada:** nenhuma — a IA identificou que o `GlobalExceptionHandler` já tratava a falha de `@Email` com 400 e `message`, então nada precisou ser criado ali.
- **Rejeitada:** nenhuma sugestão foi descartada nesta sessão.

## Arquivos ou partes da solução influenciados

*(código gerado pela IA, revisado e integrado por mim em todos os itens abaixo)*

- `apps/backend/src/main/java/br/edu/hub/dto/RegistrationRequest.java` — `@Email` ganhou `regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"`.
- `apps/frontend/src/components/RegistrationForm.tsx` — input de e-mail ganhou `pattern="[^\s@]+@[^\s@]+\.[^\s@]+"` e `title` explicativo.

Nenhum outro arquivo do projeto (nome do estudante, capacidade, demais regras de inscrição) foi alterado.

## Como o participante revisou e validou o resultado

- Leitura e conferência de cada alteração sugerida antes de aplicá-la.
- Teste manual enviando e-mails inválidos (`teste@t`) e válidos pelo formulário.
- Teste chamando o endpoint diretamente para confirmar que a validação também é aplicada no backend, não só no navegador.
- Confirmação de que a resposta de erro já existente (400 + `message`) continuou funcionando sem precisar de código novo.