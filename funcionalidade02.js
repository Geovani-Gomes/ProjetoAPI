
let usuarios = [
    { nomeUsuario: 'admin', senha: 'admin123', papel: 'admin' },
    { nomeUsuario: 'usuario', senha: 'usuario123', papel: 'usuario' }
];

//a função de login verificará se o usuário possui o papel de "admin" antes de permitir o acesso. Se o usuário for administrador, o login será bem-sucedido, caso contrário, será recusado.
function login(nomeUsuario, senha) {
    const usuario = usuarios.find(u => u.nomeUsuario === nomeUsuario && u.senha === senha && u.papel === 'admin');
    if (usuario) {
        return usuario;
    } else {
        return null;
    }
}
