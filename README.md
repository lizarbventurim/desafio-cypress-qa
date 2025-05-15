# desafio-cypress-qa

Este projeto foi desenvolvido para validar cenários de teste automatizados utilizando o framework Cypress. Os cenários foram escolhidos com base em fluxos críticos de um e-commerce, como cadastro, login, recuperação de senha, compra e logout, garantindo a qualidade e a confiabilidade das funcionalidades principais do sistema.

## Instalação de Dependências

Para instalar as dependências do projeto, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina. Em seguida, execute o seguinte comando no terminal:

```bash
npm install
```


Como Rodar os Testes

Abrir o Test Runner do Cypress
Para abrir a interface gráfica do Cypress e executar os testes, utilize o comando:
```bash
npm run test:open
```

Executar os Testes em Modo Headless
Para rodar os testes em modo headless (sem interface gráfica), utilize o comando:

```bash
npm run test:headless
```

Executar Todos os Testes
Para executar todos os testes diretamente no terminal, utilize:

```bash
npm run test
```


# Cenários de testes

Escolha dos Cenários de Teste
Os cenários de teste foram selecionados para cobrir as principais funcionalidades do sistema, garantindo que os fluxos essenciais estejam funcionando corretamente:

## Cenário 1: Validar acesso o site e verificar o título da página
- validar se o site está acessível

## Cenário 2: Validar criação de novo cadastro de usuário
- validar a criação de um novo usuário
- validar se o usuário foi criado com sucesso

## Cenário 3: Validar criação  de novo cadastro com usuário já existente
- validar a criação de um novo usuário com o mesmo email


## Cenário 4: Validar login com usuário criado
- validar o login com o usuário criado
- validar se o login foi realizado com sucesso

## Cenário 5: Validar login com usuário não existente
- validar o login com o usuário não existente
- deve retornar uma mensagem "Erro: A senha informada para o usuário 'xyz' está incorreta. Perdeu a senha?"

## Cenário 6: Validar login com senha incorreta
- validar o login com o usuário existente e senha incorreta

## Cenário 7: Validar recuperação de senha com email cadastrado
- validar a recuperação de senha
- validar se o email foi enviado com sucesso
## Cenário 8: Validar recuperação de senha com email não cadastrado
- validar a recuperação de senha com email não cadastrado
- deve retornar uma mensagem "Nome de usuário ou e-mail inválido."

## Cenário 09: Realizar compra com o usuário criado
- validar a criação de um novo usuário
- validar a compra com o usuário criado

## Cenário 10: Validar logout do usuário
- validar o logout do usuário
- validar se o logout foi realizado com sucesso