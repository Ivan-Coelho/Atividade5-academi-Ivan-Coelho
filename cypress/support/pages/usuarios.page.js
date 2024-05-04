
export default class UsuarioPage{
linkNovoUsuario = '.sc-gEvEer.fGGZSe';
linkPaginaUsuarios = '.sc-eqUAAy.OPBKy';
linkCadastroUsuario = '[href="/users/novo"]'; //quando página está vazia
inputBuscaUsuario = '.sc-gsFSXq.mUpIH';


buttonDelete = '.sc-fUnMCh.dttKkA';
buttonProxima = '#paginacaoProximo';
buttonAnterior = '#paginacaoVoltar';
paginaAtual = "#paginacaoAtual";




listaUsuarios = '#listaUsuarios > #userData';

labelEmail = '[data-test="userDataEmail"]';
labelNome = '[data-test="userDataName"]';



getListaUsuarios() {
    return cy.get(this.listaUsuarios); }

}