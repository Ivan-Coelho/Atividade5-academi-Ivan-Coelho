// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import UsuarioPage from '../support/pages/usuarios.page';

Cypress.Commands.add('deletarUsuario', function () { 
    var paginaUsuario = new UsuarioPage();
    
    cy.get(paginaUsuario.buttonDelete).click();
    cy.get('button').contains('Confirmar').click();
    cy.contains('Usuário removido!').should('exist').and('be.visible');//necessário para a API esperar
    
})