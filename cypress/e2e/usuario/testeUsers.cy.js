import { faker } from '@faker-js/faker';
import CadastroPage from '../../support/pages/cadastro.page';
import UsuarioPage from '../../support/pages/usuarios.page';


describe('testes de criação de usuário', function () {
    var paginaCadastro = new CadastroPage();
    var paginaUsuario = new UsuarioPage();

    describe('teste de cadastro de usuário de maneira invalida', function () {

        beforeEach(function () {
            cy.visit('');
            cy.get(paginaUsuario.linkNovoUsuario).click();

        });

        it('Não deve ser possível cadastrar um usuário sem informar um nome', function () {

            paginaCadastro.typeEmail('teste@raro.com');
            paginaCadastro.clickButtonSalvar();
            cy.contains('O campo nome é obrigatório.').should('exist').and('be.visible');

        });

        it('Não deve ser possível cadastrar um usuário sem informar um email', function () {
            paginaCadastro.typeNome('Ivan Coelho');
            paginaCadastro.clickButtonSalvar();
            cy.contains('O campo e-mail é obrigatório').should('exist').and('be.visible');

        });

        it('Não deve ser possível cadastrar um usuário sem informar os parametros nome e email', function () {

            paginaCadastro.clickButtonSalvar();
            cy.contains('O campo e-mail é obrigatório').should('exist').and('be.visible');
            cy.contains('O campo nome é obrigatório.').should('exist').and('be.visible');

        });

        it('Não deve ser possível cadastrar um usuário informando menos de 4 caracteres para o campo nome', function () {

            
            paginaCadastro.typeNome('Ian');
            paginaCadastro.typeEmail('asasdsagfds@jhgkçmw.com');
            paginaCadastro.clickButtonSalvar();
            cy.contains('Informe pelo menos 4 letras para o nome.').should('exist').and('be.visible');
        });

        it('Não deve ser possível cadastrar um usuário informando mais de 100 caracteres para o campo nome', function () {

           
            paginaCadastro.typeNome('Pedro De Alcântara João Carlos Leopoldo S. B. F. X. D Paula L. M. G. R. Gonzaga De Bragança E Bourbon');
            paginaCadastro.typeEmail('asasdsagfds@jhgkçmw.com');
            paginaCadastro.clickButtonSalvar();
            cy.contains('Informe no máximo 100 caracteres para o nome').should('exist').and('be.visible');
        });

        it('Não deve ser possível cadastrar um usuário informando mais de 60 caracteres para o campo email', function () {

            
            paginaCadastro.typeNome('Pedro De Alcântara João Carlos Leopoldo S. B. F. X. Paula L. M. G. R. Gonzaga De Bragança E Bourbon');
            paginaCadastro.typeEmail('precisodeumemailenormedegrandeparatestaressetrem1@raro.com.br');
            paginaCadastro.clickButtonSalvar();
            cy.contains('Informe no máximo 60 caracteres para o e-mail').should('exist').and('be.visible');
        });

        it('Não deve ser possível cadastrar um usuário com nome em branco ', function () {

            paginaCadastro.typeNome('        ');
            paginaCadastro.typeEmail('asasdsagfds@qa.com');
            //cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUsuario')

            paginaCadastro.clickButtonSalvar();
            cy.contains('Não foi possível cadastrar o usuário!').should('exist').and('be.visible');
            // cy.wait('@postUsuario').then(function(response){
            //     cy.log(response)
            //     expect(response.body.erro).to.equal('Não foi possível cadastrar o usuário!');
            // });           
        });

        it('Não deve ser possível cadastrar um usuário com caracteres number no campo nome', function () {           
            
            paginaCadastro.typeNome('Ian7');
            paginaCadastro.typeEmail('asasdsagfds@jhgkçmw.com');
            paginaCadastro.clickButtonSalvar();
            cy.contains('Formato do nome é inválido.').should('exist').and('be.visible');

        });

        it('Não deve ser possível cadastrar um usuário com caracteres especiais no campo nome', function () {
           
            paginaCadastro.typeNome('Ian"');
            paginaCadastro.typeEmail('asasdsagfds@jhgkçmw.com');
            paginaCadastro.clickButtonSalvar();
            cy.contains('Formato do nome é inválido.').should('exist').and('be.visible');

        });

        it('Não deve ser possível cadastrar um usuário com caracteres especiais no campo email', function () {
            
            paginaCadastro.typeNome('Ian"');
            paginaCadastro.typeEmail('asasdsagfds@jhgkçmw.com');
            paginaCadastro.clickButtonSalvar();
            cy.contains('Formato de e-mail inválido').should('exist').and('be.visible');

        });

        it('Não deve ser possível cadastrar um usuário utilizando email com formato invalido', function () {

            paginaCadastro.typeNome('Ivan');
            paginaCadastro.typeEmail('teste2raro.com');
            paginaCadastro.clickButtonSalvar();
            cy.contains('Formato de e-mail inválido').should('exist').and('be.visible');

        });

        it('Não deve ser possível cadastrar um novo usuário com email já cadastrado', function () { 
            // validar esse teste - testando os proprios dados que eu envio
            let email = faker.internet.email();

            cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',{
                statusCode : 422,
                body:{Erro: 'Este e-mail já é utilizado por outro usuário2.'}
            }).as('postUsuarios');

            cy.stub().as('alertaStub')
           cy.on("@postUsuarios", this.alertaStub);
            
            
            // paginaCadastro.typeNome('Ivan Coelho');
            // paginaCadastro.typeEmail(email);
            // paginaCadastro.clickButtonSalvar();

            paginaCadastro.cadastrar('Ivan Coelho', email);

            cy.wait('@postUsuarios').then(function(seila){
                cy.log(seila.response);
                
                expect(seila.response.body.Erro).to.deep.equal('Este e-mail já é utilizado por outro usuário.')

            })

        });

        it('Não deve ser possível cadastrar um novo usuário com email já cadastrado', function () { 
            
            let email = faker.internet.email();

            cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUsuarios');

            paginaCadastro.typeNome('Sei la');
            paginaCadastro.typeEmail(email);
            paginaCadastro.clickButtonSalvar();

            cy.wait('@postUsuarios');
            paginaCadastro.cadastrar('Sei la', email)
           
           cy.contains(paginaCadastro.erroEmailUtilizado, 'Este e-mail já é utilizado por outro usuário.').should('be.visible');
                       
        });

        it('Ao tentar cadastrar um usuário com email já cadastrado o sistema deve retornar a mensagem "User already exists."', function () {
            // Confirmar esse teste
        });
    });

    describe.only('Testes de cadastro de usuário válido', function () {

        beforeEach(function () {
            cy.visit('');
            cy.get(paginaUsuario.linkNovoUsuario).click();

        });

        it('Deve ser possível cadastrar um usuário com o campo nome de 4 caracteres', function () {

            let email = faker.internet.email();

            cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUser')

            paginaCadastro.typeNome('Ivan');
            paginaCadastro.typeEmail(email);
            paginaCadastro.clickButtonSalvar();
            cy.wait('@postUser');
            cy.contains('Usuário salvo com sucesso').should('exist').and('be.visible');

        });
        
        it('Deve ser possível cadastrar um usuário com o campo nome de até 100 caracteres', function(){
            

            let email = faker.internet.email();

            cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUser')

            paginaCadastro.typeNome('DPedro De Alcântara João Carlos Leopoldo S. B. F. X. Paula L. M. G. R. Gonzaga De Bragança E Bourbon');
            paginaCadastro.typeEmail(email);
            paginaCadastro.clickButtonSalvar();
            cy.wait('@postUser');
            cy.contains('Usuário salvo com sucesso').should('exist').and('be.visible');

        });

        it('Deve ser possível cadastrar um usuário com o campo email de até 60 caracteres', function(){
            //tem que apagar esse usuário para o teste não ficar intermitente
            cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUser')
            
            paginaCadastro.typeNome('Ivan');
            paginaCadastro.typeEmail('precisodeumemailenormedegrandeparatestaressetrem@raro.com.br');
            paginaCadastro.clickButtonSalvar();
            cy.wait('@postUser');
            cy.contains('Usuário salvo com sucesso').should('exist').and('be.visible');
            
        });



    });
    

})
