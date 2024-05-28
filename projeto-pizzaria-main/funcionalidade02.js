//cadastro do usuário administrador 
let usuarios = [
    { nomeUsuario: 'admin', senha: 'admin123', papel: 'admin' },
    { nomeUsuario: 'usuario', senha: 'usuario123', papel: 'usuario' }
  ];
  
  function login(nomeUsuario, senha) {
    const usuario = usuarios.find(u => u.nomeUsuario === nomeUsuario && u.senha === senha && u.papel === 'admin');
    if (usuario) {
      console.log(`Login bem-sucedido para o usuário: ${usuario.nomeUsuario}`);
      return usuario;
    } else {
      console.log(`Login falhou para o usuário: ${nomeUsuario}`);
      return null;
    }
  }
  
  // Chamada da função
  const usuarioLogado = login('admin', 'admin123');
  if (usuarioLogado) {
    console.log(`O usuário ${usuarioLogado.nomeUsuario} possui o papel de 'admin'`);
  } else {
    console.log("O usuário não possui o papel de 'admin'");
  }
  