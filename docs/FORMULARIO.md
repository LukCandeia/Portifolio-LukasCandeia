# Formulário de contato

O endpoint `https://formspree.io/f/xdegwoao` está em `src/config.js`. O destinatário pretendido é **Lukasnathan62@gmail.com** e deve ser configurado no painel do Formspree. O recebimento na caixa de entrada ainda precisa ser confirmado.

## Comportamento

Nome, e-mail e mensagem são obrigatórios. Campos preenchidos apenas com espaços são recusados. A interface apresenta os erros no idioma escolhido e leva o foco ao primeiro campo inválido.

Durante o envio, os campos ficam somente para leitura e o botão fica desabilitado. A mensagem é preservada em caso de erro. Os campos só são limpos quando o serviço responde com sucesso. Uma falha de rede ou um timeout de 20 segundos não confirma se houve entrega; o aviso comunica essa incerteza.

O envio usa POST e pede uma resposta JSON. Há mensagens distintas para sucesso, rejeição do serviço, limite de envios e falha de rede. Sem um endpoint válido, o botão permanece desabilitado e o visitante pode usar o link de e-mail.

O endpoint é público. Senhas e chaves administrativas não pertencem ao código do site. Para trocar o formulário, basta atualizar `formspreeEndpoint` com o endereço público fornecido pelo serviço.

## Verificação

`npm test` usa respostas simuladas para conferir o envio sem mandar mensagens reais. Antes de publicar, envie uma mensagem de teste e confirme o recebimento no endereço correto. Confira os limites e as opções de proteção contra spam na conta do serviço.
