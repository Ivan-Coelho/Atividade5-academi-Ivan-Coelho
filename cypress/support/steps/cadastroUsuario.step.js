import {Given, When, Then, And, But} from "cypress-cucumber-preprocessor/steps";
import DetalhesUsuarioPage from "../pages/detalhes.Page";
import CadastroPage from "../pages/cadastro.page";
import UsuarioPage from "../pages/usuarios.page";
import { faker } from '@faker-js/faker';

const paginaCadastro = new CadastroPage();
const paginaUsuario = new UsuarioPage();

Given('que acessei a funcionalidade de Cadastro', function(){
cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/user');
cy.get(paginaUsuario.linkNovoUsuario).click();

});

When('informa um novo nome', function(){

    paginaCadastro.typeNome(faker.person.firstName());  

});

When('informar um novo e-mail', function(){

    paginaCadastro.typeEmail(faker.internet.email());

});


When('confirmar a operação', function(){

        paginaCadastro.clickButtonSalvar();

});

Then('o usuário deverá ser cadastrado', function(){

    cy.contains('Usuário salvo com sucesso').should('exist').and('be.visible');
});

Then('o usuário será registrado na lista', function(){});

// exemplo de sala
When('informar um email invalido {string}', function(email){
    paginaCadastro.typeEmail(email);
});

Then('não deve ser possivel extrapolar o limite de {int} de caracteres do email no cadastro', function(tamanhoMaximo){
    cy.get(paginaCadastro.inputEmail).invoke('val').then(function(emailDigitado){
        cy.log(emailDigitado)
        expect(emailDigitado.length).to.equal(tamanhoMaximo);
    })   

});

When('informar um email com mais de {int} caracteres {string}', function(email){
    paginaCadastro.typeEmail(email);
})

When('Informar um novo nome e email',function (tabela){
    const dados = tabela.rowsHash();
    paginaCadastro.typeEmail(dados.email);

})

When ('não será possivel concluir a tentativa de cadastro do usuário', function(){
    paginaCadastro.getlistaUsuarios().should()
})


