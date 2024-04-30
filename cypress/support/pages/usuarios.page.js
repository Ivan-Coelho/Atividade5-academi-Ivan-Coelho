
export default class UsuarioPage{
linkNovoUsuario = '.sc-gEvEer.fGGZSe'
linkPaginaUsuarios = '.sc-eqUAAy.OPBKy';
inputBuscaUsuario = '.sc-gsFSXq.mUpIH'


buttonProxima = '#paginacaoProximo';
buttonAnterior = '#paginacaoVoltar';
paginaAtual = "#paginacaoAtual";

listaUsuarios = '#listaUsuarios > #userData';


getListaUsuarios() {
    return cy.get(this.listaUsuarios); }

}