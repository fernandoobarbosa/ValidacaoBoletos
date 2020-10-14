# Validação de boletos
Aplicação para validação de linha digitável de boletos bancários e pagamentos de concessionárias 

## Iniciando
###Acesse a pasta do projeto
###Abra ela no terminal 
##Execute o comando npm install
##Execute o comando npm run start

### Pré requisitos

NodeJs instalado 

## Rodando o programa

Rotas Disponíveis:

    GET /boleto/:linha
        linha - Linha digitável do boleto
        Retornos:
            - Status 200: Boleto válido
            - Status 400: Erro na linha digitável. Consulte "mensagem" no corpo da request para mais informações.


## Autores

* **Fernando Luiz de Carvalho Barbosa** 


