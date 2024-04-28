export default class CadastroPage {
    inputNome = '#name';
    inputEmail = '#email';
    buttonSalvar = '.sc-dAlyuH.jdAtLn';

    linkVoltar = '.sc-gEvEer.fGGZSe';
    linkPaginaUsuarios = '.sc-eqUAAy';
    erroEmailUtilizado = 'p';

    typeNome(nome){
        cy.get(this.inputNome).type(nome);
    }
    typeEmail(email){
        cy.get(this.inputEmail).type(email);
    }
   clickButtonSalvar(){
    cy.get(this.buttonSalvar).click();    
   }
   cadastrar(nome, email){
    this.typeNome(nome);
    this.typeEmail(email);
    this.clickButtonSalvar();
   }

}