#language: pt

Funcionalidade: Cadastro de usuário

Cenário: Cadastro de usuário com sucesso
    Dado que acessei a funcionalidade de Cadastro
    Quando informa um novo nome
    E informar um novo e-mail
    E confirmar a operação
    Então o usuário deverá ser cadastrado
    E o usuário será registrado na lista

    # exemplo em sala

    Cenário: Não deve ser possível cadastrar um usário com e-mail em formato invalido
    Dado que  acessei a funcionalidade de Cadastro
    Quando informar um novo nome
    E informar um email invalido "teste@teste" # vai para dentro da function na steps
    E confirmar a operação
    Então o usuário não deve aparecer na lista

    
    Cenário: Não deve ser possível cadastrar um usuário com e-mail com mais de 60 caracteres
    Dado que  acessei a funcionalidade de Cadastro 
    Quando informar um novo nome
    E informar um email com mais de 60 caracteres "123456789ABCDEFGH123456789ABCDEFGH123456789zzzzzzABCDEFGH@a.c"
    Então não deve ser possivel extrapolar o limite de 60 caracteres do email no cadastro

    Cenário: Não deve ser possível cadastrar um usuário com nome vazio e e-mai invalido  
    Dado que acessei a funcionalidade de Cadastro
    Quando informa um novo nome e email
    | email | teste@teste.com |
    | nome  | Ivan Coelho     |
    E confirmar a operação
    Então o usuário será registrado na lista

    Esquema do Cenário: Não deve ser feito uma tentativa de cadastro se os dados de cadastro forem invalidos
    Dado que  acessei a funcionalidade de Cadastro
    Quando informar um novo nome
    E informar um email invalido "<email>" 
    E confirmar a operação
    Então não será possivel concluir a tentativa de cadastro do usuário
    Exemplos:
    |  email  |
    |   @     |
    |   .com  |
    |   @.com | 