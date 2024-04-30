import CadastroPage from '../../support/pages/cadastro.page';
import UsuarioPage from '../../support/pages/usuarios.page';
import { faker } from '@faker-js/faker';

describe('Testes de busca de usuários', function(){
    var paginaCadastro = new CadastroPage();
    var paginaUsuario = new UsuarioPage();
    const email2 = faker.internet.email();    
    const name = faker.person.firstName();
    const email = email2.toLowerCase();
    
    before(function(){

        cy.visit('');       
        cy.get(paginaUsuario.linkNovoUsuario).click();

        cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUser')
             
        paginaCadastro.cadastrar(name, email);           
        cy.wait('@postUser');        
        
    });

    beforeEach(function(){
        cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');        
        
    });

    after(function(){
        //cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

        cy.get(paginaUsuario.inputBuscaUsuario).type(email);
        cy.get('.sc-fUnMCh.dttKkA').click();
        cy.get('button').contains('Confirmar').click();          

    });

    it('Deve ser possível buscar um usuário pelo nome', function(){                    
        
        cy.get(paginaUsuario.inputBuscaUsuario).type(name);        
        cy.contains('p[data-test="userDataName"]', name).and('be.visible');
        cy.get('[data-test="userDataEmail"]').should("contain.text", "E-mail: ", email).and('be.visible'); 
        //pq o nome valida e o email só com o contain.text?
        
    });

    it('Deve ser possivel buscar um usuário pelo email', function(){

        cy.get(paginaUsuario.inputBuscaUsuario).type(email);       
        cy.get('[data-test="userDataEmail"]').should("contain.text", "E-mail: ", email).and('be.visible');
        cy.contains('p[data-test="userDataName"]', name).and('be.visible');

    });

    it('Deve ser possivel visualizar todas as informações dos usuários cadastrados', function(){
        // pq se esse teste for o último o delete falha?
        cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/search?value=' + email).as('pesquisaUsuario');
        cy.get(paginaUsuario.inputBuscaUsuario).type(email);       
        cy.wait('@pesquisaUsuario');
        
        cy.contains('Ver detalhes').click();
        cy.get('[name="id"]').should('exist').and('be.visible');
        cy.get('#userName').should('exist').and('be.visible').and('have.value', name);
        cy.get('#userEmail').should('exist').and('be.visible').and('have.value', email);
        
    });
    

    it('Se não existir nenhum usuário na lista deve aparecer a opção para cadastrar um novo usuário', function(){
        cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',{
            statusCode: 200,
            body: []
        }).as('listaVazia');
                
        cy.wait('@listaVazia');
        cy.contains('[href="/users/novo"]', 'Cadastre um novo usuário').should('exist').and('be.visible');
    
    }); 

});