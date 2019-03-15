# API de consulta para invoices

>API RestFul para consulta  de invoices

## Build Setup


### Abra um console do Mysql logado com um usuário com privilégios de grant
Copie e cole um bloco de código SQL por vez que se encontra em ./source/init.database.sql.
Isso irá criar o banco, o usuário da aplicação e  tabela para os posts.

### Instale as dependências 
``` bash
sudo npm install
```
### Irá rodar os testes de unidade
``` bash
sudo npm run test-pre
``` 
### Irá rodar os testes de API
``` bash
sudo npm run test-dev
``` 
### Irá rodar em localhost:32019
``` bash
sudo npm run dev
``` 
### Funcionamento da aplicação:
Crie um token de sessão e utilize para acessar os endpoints abaixo. Caso contrário receberá um mensagem de token inválido ou expirado.
>Em ./source/stone-invoices.postman_collection.json existe uma collection do Postman para testar os endpoints abaixo. Basta importá-la.

---

## Host: http://localhost:32019 
### Os endpoints da aplicação para consulta são:
Para criar o token de sessão
``` bash
ENDPOINT: POST => /api/v1/token/create
x-www-form-urlencoded
Body:{
      "login":"stoneTest",
      "password":"$T0n&n3t&s5"
    }
```
Para validar o token de sessão separadamente
``` bash
ENDPOINT: GET => /api/v1/token/valid
Headers: { 
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiMjAxOS0wMy0xNCAwMDowMTozNCIsImlhdCI6MTU1MjUzMjQ5NCwiZXhwIjoxNTUyNTM2MDk0fQ.ajY9OZJXgQlucIPzuplHa6_bUCzCAtRUKTqgZBUeAwM"
        }
```

Consulta paginada e ordenanda por mês
``` bash
ENDPOINT: GET => /api/v1/invoices/list/0/10
Headers: { 
            "x-access-order-by-month":"ReferenceMonth",
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiMjAxOS0wMy0xNCAwMDowMTozNCIsImlhdCI6MTU1MjUzMjQ5NCwiZXhwIjoxNTUyNTM2MDk0fQ.ajY9OZJXgQlucIPzuplHa6_bUCzCAtRUKTqgZBUeAwM"
        }
```
Consulta paginada e ordenanda por ano
``` bash
ENDPOINT: GET => /api/v1/invoices/list/0/10
Headers: { 
            "x-access-order-by-year":"ReferenceYear",
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiMjAxOS0wMy0xNCAwMDowMTozNCIsImlhdCI6MTU1MjUzMjQ5NCwiZXhwIjoxNTUyNTM2MDk0fQ.ajY9OZJXgQlucIPzuplHa6_bUCzCAtRUKTqgZBUeAwM"
        }
```
Consulta paginada e ordenanda por documentos
``` bash
ENDPOINT: GET => /api/v1/invoices/list/0/10
Headers: { 
            "x-access-order-by-doc":"Document",
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiMjAxOS0wMy0xNCAwMDowMTozNCIsImlhdCI6MTU1MjUzMjQ5NCwiZXhwIjoxNTUyNTM2MDk0fQ.ajY9OZJXgQlucIPzuplHa6_bUCzCAtRUKTqgZBUeAwM"
        }
```
Consulta paginada e ordenanda por documentos, ano, e mês
``` bash
ENDPOINT: GET => /api/v1/invoices/list/0/10
Headers: { 
            "x-access-order-by-doc":"Document",
            "x-access-order-by-month":"ReferenceYear",
            "x-access-order-by-month":"ReferenceMonth",
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiMjAxOS0wMy0xNCAwMDowMTozNCIsImlhdCI6MTU1MjUzMjQ5NCwiZXhwIjoxNTUyNTM2MDk0fQ.ajY9OZJXgQlucIPzuplHa6_bUCzCAtRUKTqgZBUeAwM"
        }
```
Deletando uma invoice
``` bash
ENDPOINT: DELETE => /api/v1/invoices/delete/1
Headers: { 
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiMjAxOS0wMy0xNCAwMDowMTozNCIsImlhdCI6MTU1MjUzMjQ5NCwiZXhwIjoxNTUyNTM2MDk0fQ.ajY9OZJXgQlucIPzuplHa6_bUCzCAtRUKTqgZBUeAwM"
        }
```

