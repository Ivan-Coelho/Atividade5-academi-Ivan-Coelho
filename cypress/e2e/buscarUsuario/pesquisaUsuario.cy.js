import CadastroPage from '../../support/pages/cadastro.page';
import UsuarioPage from '../../support/pages/usuarios.page';
import DetalhesPage from '../../support/pages/detalhes.Page';
import { faker } from '@faker-js/faker';

describe('Testes de busca de usuários', function(){
    var paginaCadastro = new CadastroPage();
    var paginaUsuario = new UsuarioPage();
    var paginaDetalhes = new DetalhesPage();
    const email = faker.internet.email().toLowerCase();    
    const name = faker.person.firstName();
   // const email = email2.toLowerCase();
    
    before(function(){

        cy.visit('');       
        cy.get(paginaUsuario.linkNovoUsuario).click();

        cy.intercept('POST', '/api/v1/users').as('postUser')
             
        paginaCadastro.cadastrar(name, email);           
        cy.wait('@postUser');        
        
    });

    beforeEach(function(){
        cy.visit('/users');        
        
    });

    after(function(){
        //cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

        cy.get(paginaUsuario.inputBuscaUsuario).type(email);
        cy.get(paginaUsuario.buttonDelete).click();
        cy.get('button').contains('Confirmar').click();          

    });

    it('Deve ser possível buscar um usuário pelo nome', function(){                    
        
        cy.get(paginaUsuario.inputBuscaUsuario).type(name);        
        cy.contains(paginaUsuario.labelNome, name).and('be.visible');
        cy.get(paginaUsuario.labelEmail).should("contain.text", "E-mail: ", email).and('be.visible'); 
        //pq o nome valida e o email só com o contain.text?
        
    });

    it('Deve ser possivel buscar um usuário pelo email', function(){

        cy.get(paginaUsuario.inputBuscaUsuario).type(email);       
        cy.get(paginaUsuario.labelEmail).should("contain.text", "E-mail: ", email).and('be.visible');
        cy.contains(paginaUsuario.labelNome, name).and('be.visible');

    });

    it('Deve ser possivel visualizar todas as informações dos usuários cadastrados', function(){
        // pq se esse teste for o último o delete falha?
        cy.intercept('GET', '/api/v1/search?value=' + email).as('pesquisaUsuario');
        cy.get(paginaUsuario.inputBuscaUsuario).type(email);       
        cy.wait('@pesquisaUsuario');
        
        cy.contains('Ver detalhes').click();
        cy.get(paginaDetalhes.labelId).should('exist').and('be.visible');
        cy.get(paginaDetalhes.labelNome).should('exist').and('be.visible').and('have.value', name);
        cy.get(paginaDetalhes.labelEmail).should('exist').and('be.visible').and('have.value', email);
        
    }); 
    
    it('Deve ser possivel atualizar as informações dos usuários cadastrados', function(){
        // Não é teste
        cy.intercept('GET', '/api/v1/search?value=' + email).as('pesquisaUsuario');
        cy.get(paginaUsuario.inputBuscaUsuario).type(email);       
        cy.wait('@pesquisaUsuario');
        
        cy.contains('Ver detalhes').click();
        cy.get(paginaDetalhes.buttonEditar).click();
        cy.get(paginaDetalhes.labelNome).clear().type('Ivan Coelho')
        cy.get(paginaDetalhes.buttonCancelar).click();
        
    }); 

    it('Se não existir nenhum usuário na lista deve aparecer a opção para cadastrar um novo usuário', function(){
        cy.intercept('GET', '/api/v1/users',{
            statusCode: 200,
            body: []
        }).as('listaVazia');
                
        cy.wait('@listaVazia');
        cy.contains(paginaUsuario.linkCadastroUsuario, 'Cadastre um novo usuário').should('exist').and('be.visible');
    
    }); 

});