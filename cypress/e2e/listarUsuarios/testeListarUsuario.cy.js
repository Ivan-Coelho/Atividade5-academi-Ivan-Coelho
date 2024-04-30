import UsuarioPage from '../../support/pages/usuarios.page';


describe('testes de listagem de usuários', function () {
   
    var paginaUsuario = new UsuarioPage();



    it('Deve exibir a lista de usuários', function () {

        cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('user');
        cy.visit('');
        cy.wait('@user');
        cy.get(paginaUsuario.listaUsuarios).should('exist').and('be.visible');
        
    });

    it('Caso não existam usuários cadastrados deve existir uma opção para cadastrar um usuário', function () {

        cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', {
            statusCode: 200,
            body: []
        }).as('user')

        cy.visit('');
        cy.wait('@user');        
        cy.contains('[href="/users/novo"]', 'Cadastre um novo usuário').should('exist').and('be.visible');
        cy.get(paginaUsuario.listaUsuarios).should('not.exist');


    });

    it('Caso não existam usuários cadastrados deve existir uma link para página de cadastro de usuário', function () {

        cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', {
            statusCode: 200,
            body: []
        }).as('user')

        cy.visit('');
        cy.wait('@user');
        cy.contains('[href="/users/novo"]', 'Cadastre um novo usuário').should('exist').and('be.visible');
        //cy.contains('.sc-bmzYkS'); Pq consigo clicar, mas não consigo falar que existe?
        cy.get('.sc-bmzYkS').click();        
        cy.url().should('equal', 'https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');
        

    });

});

describe('testes de paginação', function () {
    
    var paginaUsuario = new UsuarioPage();

    describe("testes de duas páginas", function () {


        beforeEach(function () {
            cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', {
                statusCode: 200,
                fixture: "listaUsuarios.json",
            }).as('user');
            cy.visit('');
        });

        it('Deve ter duas págianas para 10 usuários cadastrados', function () {

            cy.wait("@user")
            cy.get(paginaUsuario.paginaAtual).should('contain.text', '1 de 2');

        });

        it('Deve ser possível navegar para a segunda página', function () {

            cy.wait("@user")
            cy.get(paginaUsuario.buttonProxima).click()

            cy.get(paginaUsuario.paginaAtual).should('contain.text', '2 de 2');

        });
    })

    describe('testes de três páginas', function(){

        beforeEach(function () {
            cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', {
                statusCode: 200,
                fixture: "listaUsuarios2.json",
            }).as('user');
            cy.visit('');
        });

        it('Deve ter três págianas para 15 usuários cadastrados', function () {

            cy.wait("@user")
            cy.get(paginaUsuario.paginaAtual).should('contain.text', '1 de 3');

        });
        it('Deve ser possível navegar para a segunda página', function () {

            cy.wait("@user")
            cy.get(paginaUsuario.buttonProxima).click()

            cy.get(paginaUsuario.paginaAtual).should('contain.text', '2 de 3');

        });
        it('Deve ser possível navegar para a terceira página', function () {

            cy.wait("@user")
            cy.get(paginaUsuario.buttonProxima).click()
            cy.get(paginaUsuario.buttonProxima).click()

            cy.get(paginaUsuario.paginaAtual).should('contain.text', '3 de 3');
        });

        it('Deve ser possível voltar uma página', function () {

            cy.wait("@user")
            cy.get(paginaUsuario.buttonProxima).click()
            cy.get(paginaUsuario.buttonProxima).click()
            cy.get(paginaUsuario.paginaAtual).should('contain.text', '3 de 3');
            cy.get(paginaUsuario.buttonAnterior).click()

            cy.get(paginaUsuario.paginaAtual).should('contain.text', '2 de 3');
        });





    });




});
