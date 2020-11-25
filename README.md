# NeoprospectaChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Todo

### Requisitos Funcionais

- [x] RF01: O endpoint a ser consultado (GET) é:
http://private-92a969-processoseletivo1.apiary-mock.com/customers (sempre retorna a mesma
lista);

- [x] RF02: A listagem de clientes deve ser apresentada em forma de “tabela” quando a tela for maior ou igual a 768px e em forma de “cards” quando a tela for menor que 768px;

- [x] RF03: A listagem deve ser ordenável e filtrável por Id, nome, idade e cidade (front-side);

- [x] RF04: A listagem deve possuir paginação a cada 10 clientes (front-side);
- [x] RF05: Deve haver um botão de “editar” cliente em cada linha da tabela;
- [x] RF06: Ao clicar no botão de “editar” o usuário deve ser redirecionado para uma outra rota com os dados do cliente em formato editável;
- [x] RF07: Deve ser adicionado na tela de edição um botão de “salvar” e um de “cancelar”;
- [x] RF08: Ao clicar no botão de “salvar” os dados atualizados do cliente devem ser enviados (PUT) para o seguinte endpoint (ele sempre retorna sucesso no PUT, mas não salva de verdade :)
“https://private-92a969-processoseletivo1.apiary-mock.com/customers/{id_do_cliente}/”;
- [x] RF09: Sendo que, depois do retorno da requisição PUT o usuário deve ser redirecionado para
listagem e a aplicação deve apresentar a ele uma notificação dizendo “Cliente
{nome_do_cliente} atualizado com sucesso!”;

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
