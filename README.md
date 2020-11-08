## Teste Técnico - Back-end - Linkapi

API escrita com a NodeJS + Express + MongoDB.

#### Por onde começar?

- Comece clonando o respositório no git 

```sh
git clone https://github.com/gabriellopesdev/teste-backend-linkapi.git
```

- Na raiz do projeto, crie um arquivo .env para configurar as diretrizes de acesso da aplicação:	

```sh
DATABASE_CON=[string de conexão do seu banco mongoDB]

URL_PIPEDRIVE=https://[nome da organização no pipedrive].pipedrive.com/api/v1/

KEY_PIPEDRIVE=[api token do Pipedrive]

URL_BLING=https://bling.com.br/Api/v2/

KEY_BLING=[api token do Bling]
```

- Agora é só executar o comando abaixo e aplicação estará disponível para testar!

```sh
npm run start
```

Acesse [http://localhost:3000/](http://localhost:3000/) para dar uma conferida na documentação.

#### Melhorias

Durante o desenvolvimento pude observar alguns pontos de melhoria na aplicação:

- Webhooks: Ao invés da aplicação buscar as oportunidades com status igual a ganho na api da Pipedrive, ela, automáticamente, se registrar no webhook para receber os dados sempre que uma oportunidade trocar de status, para então executar os demais processos
- Typescript: poderiam haver ganhos estruturais utilizando typescript para implementar inversão de depencia e desacoplar mais facilmente as classes de banco de dados