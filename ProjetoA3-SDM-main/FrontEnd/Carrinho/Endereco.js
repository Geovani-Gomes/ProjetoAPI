document.addEventListener('DOMContentLoaded', () => {
    const enderecoCadastroCheckbox = document.getElementById('EnderecoCadastro');
    const outroEnderecoCheckbox = document.getElementById('outroEndereco');
    const outroEnderecoCampos = document.getElementById('outroEnderecoCampos');

    // Função para lidar com a mudança de estado dos checkboxes
    const handleCheckboxChange = (event) => {
        if (event.target.id === 'EnderecoCadastro' && event.target.checked) {
            outroEnderecoCheckbox.checked = false;
            outroEnderecoCampos.style.display = 'none';
        } else if (event.target.id === 'outroEndereco' && event.target.checked) {
            enderecoCadastroCheckbox.checked = false;
            outroEnderecoCampos.style.display = 'block';
        } else {
            outroEnderecoCampos.style.display = 'none';
        }
    };

    // Adiciona event listeners para os checkboxes
    enderecoCadastroCheckbox.addEventListener('change', handleCheckboxChange);
    outroEnderecoCheckbox.addEventListener('change', handleCheckboxChange);

    // Inicializa o estado dos campos baseado no estado dos checkboxes
    if (outroEnderecoCheckbox.checked) {
        outroEnderecoCampos.style.display = 'block';
    } else {
        outroEnderecoCampos.style.display = 'none';
    }
});
