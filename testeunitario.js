function testLogin() {
    // Teste para login com credenciais corretas
    let user = login('admin', 'admin123');
    console.assert(user !== null, "Login com credenciais corretas falhou");

    // Teste para login com credenciais incorretas
    user = login('admin', 'senha_errada');
    console.assert(user === null, "Login com credenciais incorretas falhou");

    // Teste para login com usuário inexistente
    user = login('usuario_inexistente', 'senha');
    console.assert(user === null, "Login com usuário inexistente falhou");
}

testLogin();
