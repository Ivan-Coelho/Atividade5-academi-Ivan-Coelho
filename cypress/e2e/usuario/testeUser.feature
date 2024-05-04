Funcionalidade: Cadastro de usuário

Cenário: Cadastro de usuário com sucesso fornecendo 4 caracteres para o campo nome
    Dado que acessei a funcionalidade de Cadastro
    Quando informa um novo nome "Ivan"
    E informar um novo e-mail
    E confirmar a operação
    Então deve aparecer a mensagem Usuário salva com sucesso
    
Cenário: Cadastro de usuário com sucesso fornecendo 100 caracteres para o campo nome
    Dado que acessei a funcionalidade de Cadastro
    Quando informa um novo nome "DPedro De Alcântara João Carlos Leopoldo S. B. F. X. Paula L. M. G. R. Gonzaga De Bragança E Bourbon"
    E informar um novo e-mail
    E confirmar a operação
    Então deve aparecer a mensagem Usuário salva com sucesso

Cenário: Cadastro de usuário com sucesso fornecendo 60 caracteres para o campo email
    Dado que acessei a funcionalidade de Cadastro
    Quando informa um novo nome 
    E informar um novo e-mail "precisodeumemailenormedegrandeparatestaressetrem@raro.com.br"
    E confirmar a operação
    Então deve aparecer a mensagem Usuário salvo com sucesso

    Cenário: Atualizar o nome de um usuário já cadastrado
    Dado que acessei em detalhes os dados do usuário
    Quando clica no botão editar 
    E informar um novo nome
    E salva a operação
    Então deve aparecer a mensagem informações atualizadas com sucesso

    Cenário: Atualizar o email de um usuário já cadastrado
    Dado que acessei em detalhes os dados do usuário
    Quando clica no botão editar 
    E informar um novo email
    E salva a operação
    Então deve aparecer a mensagem informações atualizadas com sucesso

    Cenário: Deve ser possível deletar um usuário cadastrado
    Dado que acessei em detalhes os dados do usuário
    Quando clica no botão deletar 
    E confirmar a operação #confirmar se pode ficar assim
    Então deve aparecer a mensagem usuário removido!